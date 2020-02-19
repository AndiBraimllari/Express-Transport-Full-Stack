package com.transport.express.authentication.service;

import com.transport.express.authentication.model.UserPrincipal;
import com.transport.express.authentication.model.UserPrincipalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
public class TransportUserDetails implements UserDetailsService {
    private UserPrincipalRepository principalRepository;

    public TransportUserDetails() {
    }

    @Autowired
    public TransportUserDetails(UserPrincipalRepository principalRepository) {
        this.principalRepository = principalRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        Optional<UserPrincipal> principal = principalRepository.findByEmail(email);

        if (principal.isPresent()) {
            return org.springframework.security.core.userdetails.User
                    .withUsername(email)
                    .password(Arrays.toString(principal.get().getPassword()))
                    .authorities(principal.get().getUser().getAuthorities())
                    .accountExpired(false)
                    .accountLocked(false)
                    .credentialsExpired(false)
                    .disabled(false)
                    .build();
        } else {
            throw new IllegalStateException("User not found.");
        }
    }

}
