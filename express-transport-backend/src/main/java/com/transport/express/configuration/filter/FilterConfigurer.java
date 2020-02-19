package com.transport.express.configuration.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FilterConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    private static final Logger LOGGER = LoggerFactory.getLogger(FilterConfigurer.class);
    private List<AbstractTransportFilter> filterInstances;

    public FilterConfigurer() {
    }

    @Autowired
    FilterConfigurer(List<AbstractTransportFilter> filterInstances) {
        this.filterInstances = filterInstances;
    }

    @Override
    public void configure(HttpSecurity http) {
        LOGGER.info("Currently used filter instances: [{}]", filterInstances);
        filterInstances.forEach(filterConfigurer ->
                http.addFilterBefore(filterConfigurer, UsernamePasswordAuthenticationFilter.class));
    }
}
