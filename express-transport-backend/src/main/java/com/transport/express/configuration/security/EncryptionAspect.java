package com.transport.express.configuration.security;

import com.transport.express.authentication.model.UserPrincipal;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import static java.util.Arrays.*;
import static java.util.stream.Collectors.joining;

@Aspect
@Component
public class EncryptionAspect {
    private final BCryptPasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Autowired
    EncryptionAspect(BCryptPasswordEncoder passwordEncoder, ModelMapper modelMapper) {
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
    }

    @Around("execution(* com.transport.express.authentication.controller.UserController.createUser(..))")
    public Object encodeCreationPassword(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        UserPrincipal principal = getEncodedPrincipal(proceedingJoinPoint);
        return proceedingJoinPoint.proceed(new Object[]{principal});
    }

    @Around("execution(* com.transport.express.authentication.controller.UserController.passwordReset(..))")
    public Object encodeResetPassword(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        UserPrincipal principal = getEncodedPrincipal(proceedingJoinPoint);
        return proceedingJoinPoint.proceed(new Object[]{principal, proceedingJoinPoint.getArgs()[1]});
    }

    private UserPrincipal getEncodedPrincipal(ProceedingJoinPoint proceedingJoinPoint) {
        UserPrincipal principal = modelMapper.map(proceedingJoinPoint.getArgs()[0], UserPrincipal.class);

        String encodedPassword = passwordEncoder.encode(
                stream(principal.getPassword()).map(Object::toString).collect(joining()));

        Character[] pass =
                encodedPassword.chars().boxed().map(integer -> (char) (int) integer).toArray(Character[]::new);

        principal = new UserPrincipal.Builder().setUser(principal.getUser()).setPassword(pass).build();
        return principal;
    }
}
