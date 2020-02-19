package com.transport.express;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@EnableCaching
@SpringBootApplication
public class TransportApplication extends SpringBootServletInitializer implements ErrorController {

    public static void main(String[] args) {
        SpringApplication.run(TransportApplication.class, args);
    }

    @Override
    public SpringApplicationBuilder configure(SpringApplicationBuilder applicationBuilder) {
        return applicationBuilder.sources(TransportApplication.class);
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    private static final String ERROR_PATH = "/error";
    private static final String FORWARD_PATH = "/index.html";

    @RequestMapping(value = ERROR_PATH)
    public String error() { // Allow: GET, HEAD Need to add POST here so throwing exceptions doesn't give POST method not supported
        return "forward:" + FORWARD_PATH;
    }

    @Override
    public String getErrorPath() {
        return ERROR_PATH;
    }
}
