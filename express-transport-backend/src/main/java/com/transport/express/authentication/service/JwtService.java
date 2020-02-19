package com.transport.express.authentication.service;

import com.transport.express.authentication.model.User;
import com.transport.express.authentication.model.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class JwtService {
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Autowired
    public JwtService(JwtProvider jwtProvider, UserRepository userRepository) {
        this.jwtProvider = jwtProvider;
        this.userRepository = userRepository;
    }

    public User validateToken(HttpServletRequest request) {
        String token = jwtProvider.resolveToken(request);
        if (jwtProvider.validateToken(token)) {
            return userRepository.findByEmail(jwtProvider.getUsername(token)).get();
        } else {
            return null;
        }
    }

    public String fetchToken(String subject) {
        return jwtProvider.createToken(subject);
    }
}
