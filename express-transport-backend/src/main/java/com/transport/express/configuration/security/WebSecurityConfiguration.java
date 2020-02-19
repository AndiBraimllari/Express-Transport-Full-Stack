package com.transport.express.configuration.security;

import com.transport.express.configuration.filter.FilterConfigurer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import static java.util.Arrays.*;

@Configuration
//@EnableWebSecurity(debug = true) // TODO USEFUL FOR DEV.
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
    private final FilterConfigurer filterConfigurer;

    @Autowired
    public WebSecurityConfiguration(FilterConfigurer filterConfigurer) {
        this.filterConfigurer = filterConfigurer;
    }

    @Bean
    public FilterRegistrationBean<CorsFilter> customCorsFilter() { // TODO BEWARE CERTAIN NAME CAUSES BUG
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*"); // TODO NARROW DOWN FOR PROD.
        config.setAllowedMethods(asList("POST", "OPTIONS", "GET", "DELETE", "PUT", "PATCH"));
        config.setAllowedHeaders(asList("X-Requested-With", "Origin", "Content-Type", "Accept",
                "Authorization", "Pay-Token", "Amount", "X-ID-TOKEN"));
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors();
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeRequests()
                .antMatchers("/users/authentication", "/users/createUser", "/jwt/validate",
                        "/users/enableAccount/*", "/users/enabled", "/users/passwordReset/*",
                        "/users/passwordResetRequest").permitAll()
                .anyRequest().authenticated();
        http.apply(filterConfigurer);
    }

    @Override // TODO ENABLES SWAGGER AND WEBSOCKET IN DEV., REVISE FOR PROD
    public void configure(WebSecurity webSecurity) {
        webSecurity.ignoring()
                .antMatchers("/**")
                .antMatchers("/v2/api-docs")
                .antMatchers("/swagger-resources/**")
                .antMatchers("/swagger-ui.html")
                .antMatchers("/configuration/**")
                .antMatchers("/webjars/**")
                .antMatchers("/index.html")
                .antMatchers("/public")
                .antMatchers("/favicon.ico");
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
