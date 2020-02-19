package com.transport.express.authentication.service;

import com.transport.express.authentication.model.*;
import com.transport.express.common.service.MailingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static java.util.Arrays.*;
import static java.util.stream.Collectors.*;

@Service
@Primary
public class UserService extends TransportUserDetails {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserPrincipalRepository principalRepository;
    private final VerificationCodeRepository verificationRepository;
    private final MailingService mailingService;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder,
                       UserPrincipalRepository principalRepository, VerificationCodeRepository verificationRepository,
                       MailingService mailingService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.principalRepository = principalRepository;
        this.verificationRepository = verificationRepository;
        this.mailingService = mailingService;
    }

    public ResponseEntity<?> signin(UserPrincipal userPrincipal) {
        try {
//        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            ResponseEntity<User> authenticationResponse = authenticateUser(userPrincipal);
            if (authenticationResponse.getStatusCode() != HttpStatus.OK) {
                return authenticationResponse;
            }
            return new ResponseEntity<>(jwtProvider.createToken(userPrincipal.getUser().getEmail()).toCharArray(), HttpStatus.OK);
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Invalid username/password supplied");
        }
    }

    @CacheEvict("users")
    public User createUser(UserPrincipal principal) {
        Optional<UserPrincipal> principalOptional = principalRepository.findByEmail(principal.getUser().getEmail());
        principalOptional.ifPresent(existingAuthUser -> {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        });

        UserPrincipal userPrincipal = principalRepository.save(new UserPrincipal.Builder()
                .setUser(principal.getUser())
                .setPassword(principal.getPassword())
                .build());
        verificationRepository.save(new VerificationCode(userPrincipal.getUser().getEmail(),
                VerificationCode.VerificationType.ENABLE_ACCOUNT));
        mailingService.sendVerificationMail(userPrincipal.getUser().getEmail());

        return userRepository.save(principal.getUser());
    }

    public User deleteUser(String userId) {
        User user = findUser(userId);
        userRepository.deleteById(userId);
        return user;
    }

    private User findUser(String userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Cacheable("users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    private ResponseEntity<User> authenticateUser(UserPrincipal principal) {
        Optional<User> userOptional = userRepository.findByEmail(principal.getUser().getEmail());

        if (!userOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Optional<UserPrincipal> realUser = principalRepository.findByEmail(principal.getUser().getEmail());
        if (realUser.isPresent()) {
            if (passwordEncoder.matches(
                    stream(principal.getPassword()).map(Object::toString).collect(joining()),
                    stream(realUser.get().getPassword()).map(Object::toString).collect(joining()))) {
                if (!realUser.get().isEnabled()) {
                    return new ResponseEntity<>(HttpStatus.FORBIDDEN); //disabled user
                } else {
                    return new ResponseEntity<>(userOptional.get(), HttpStatus.OK);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); //incorrect password
            }
        } else {
            return new ResponseEntity<>(HttpStatus.CONFLICT); //conflict because user exists but userAuth doesn't
        }
    }

    public ResponseEntity<?> enableAccount(String password, String code) {
        Optional<VerificationCode> verificationOptional = verificationRepository.findByCode(code);
        if (!verificationOptional.isPresent() || verificationOptional.get().isUsed()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Optional<User> userOptional = userRepository.findByEmail(verificationOptional.get().getUserEmail());
        if (!userOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Optional<UserPrincipal> userAuthOptional = principalRepository.findByEmail(userOptional.get().getEmail());
        if (!userAuthOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        UserPrincipal userAuth = userAuthOptional.get();
        VerificationCode verificationCode = verificationOptional.get();
        return processAccountVerification(password, userAuth, verificationCode);
    }

    private ResponseEntity<?> processAccountVerification(String password, UserPrincipal userAuth, // helper method
                                                         VerificationCode verificationCode) {
        if (passwordEncoder.matches(password, stream(userAuth.getPassword())
                .map(Object::toString).collect(joining())) &&
                verificationCode.getExpirationDateTime().isAfter(LocalDateTime.now()) &&
                !userAuth.isEnabled()) {
            userAuth.setEnabled(true);
            verificationCode.setUsed(true);
            principalRepository.save(userAuth);
            verificationRepository.save(verificationCode);
            return signin(new UserPrincipal.Builder()
                    .setUser(userAuth.getUser())
                    .setPassword(password.chars().mapToObj(charval -> (char) charval).toArray(Character[]::new)).build());

        } else if (!passwordEncoder.matches(password, stream(userAuth.getPassword())
                .map(Object::toString).collect(joining()))) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // UNAUTHORIZED for wrong password
        } else if (verificationCode.getExpirationDateTime().isBefore(LocalDateTime.now())) {
            return new ResponseEntity<>(HttpStatus.GONE);
        } else if (userAuth.isEnabled()) {
            return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
        } else {
            return null;
        }
    }

    public ResponseEntity<Boolean> isAccountEnabled(String email) {
        Optional<UserPrincipal> principal = principalRepository.findByEmail(email);
        return principal.map(p -> new ResponseEntity<>(p.isEnabled(), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<Boolean> requestPasswordReset(UserPrincipal userPrincipal) {
        Optional<UserPrincipal> principalOptional = principalRepository.findByEmail(userPrincipal.getUser().getEmail());

        if (!principalOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        verificationRepository.save(new VerificationCode(userPrincipal.getUser().getEmail(),
                VerificationCode.VerificationType.RESET_PASSWORD));
        mailingService.sendPasswordResetRequestMail(userPrincipal.getUser().getEmail());
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    public ResponseEntity<Boolean> resetPassword(UserPrincipal userPrincipal, String code) {
        Optional<VerificationCode> verificationCodeOptional = verificationRepository.findByCode(code);

        if (!verificationCodeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Optional<UserPrincipal> principalOptional = principalRepository.findByEmail(userPrincipal.getUser().getEmail());

        if (!principalOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        principalOptional.get().setPassword(userPrincipal.getPassword());
        principalRepository.save(principalOptional.get());
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
