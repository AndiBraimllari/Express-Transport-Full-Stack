package com.transport.express.authentication.controller;

import com.transport.express.authentication.model.User;
import com.transport.express.authentication.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(path = "jwt")
public class JwtController {
    private final JwtService jwtService;

    @Autowired
    public JwtController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @GetMapping(path = "/validate")
    public User validateToken(HttpServletRequest request) {
        return jwtService.validateToken(request);
    }
}
