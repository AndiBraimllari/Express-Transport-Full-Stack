package com.transport.express.delivery.service;

import com.transport.express.authentication.model.VerificationCode;
import com.transport.express.authentication.model.VerificationCodeRepository;
import com.transport.express.delivery.model.Delivery;
import com.transport.express.delivery.model.DeliveryRepository;
import com.transport.express.delivery.model.DeliveryStatus;
import com.transport.express.authentication.service.JwtProvider;
import com.transport.express.authentication.model.User;
import com.transport.express.authentication.model.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

import static java.util.Comparator.*;
import static java.util.stream.Collectors.*;

@Service
public class DeliveryService {
    private final DeliveryRepository deliveryRepository;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final VerificationCodeRepository verificationRepository;

    @Autowired
    public DeliveryService(DeliveryRepository deliveryRepository, JwtProvider jwtProvider,
                           UserRepository userRepository, VerificationCodeRepository verificationRepository) {
        this.deliveryRepository = deliveryRepository;
        this.jwtProvider = jwtProvider;
        this.userRepository = userRepository;
        this.verificationRepository = verificationRepository;
    }

    public Delivery addDelivery(Delivery delivery) {
        return deliveryRepository.save(delivery);
    }

    public Delivery updateDelivery(Delivery sentDelivery, DeliveryStatus status, HttpServletRequest request) {
        String currentUserEmail = jwtProvider.getUsername(jwtProvider.resolveToken(request));
        Optional<User> currentUser = userRepository.findByEmail(currentUserEmail);
        if (currentUserEmail == null || !currentUser.isPresent()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Please sign in/sign up first!");
        }
        Optional<Delivery> foundDelivery = deliveryRepository.findById(sentDelivery.getId());
        if (foundDelivery.isPresent()) {
            foundDelivery.get().setStatus(status);
            deliveryRepository.save(foundDelivery.get());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Delivery not found!");
        }

        currentUser.get().getDeliveries().add(foundDelivery.get());
        userRepository.save(currentUser.get());

        return foundDelivery.get();
    }

    public List<Delivery> getDeliveries() {
        return deliveryRepository.findAll()
                .stream()
                .filter(delivery -> delivery.getName()!= null)
                .filter(delivery -> delivery.getStatus() != DeliveryStatus.CONCLUDED)
                .sorted(comparing(Delivery::getName)).collect(toList());
    }

    public ResponseEntity<Boolean> redeemCoupon(String coupon) {
        Optional<VerificationCode> verificationCodeOptional = verificationRepository.findByCode(coupon);

        if (!verificationCodeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (verificationCodeOptional.get().isUsed()) {
            return new ResponseEntity<>(HttpStatus.GONE);
        }

        verificationCodeOptional.get().setUsed(true);
        verificationRepository.save(verificationCodeOptional.get());
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
