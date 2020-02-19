package com.transport.express.payment.mervice;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.PostConstruct;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

@Component
public class StripeClientService implements Serializable {

    @Value("${transport.stripe.secret-key}")
    private String stripeSecretKey;

    @PostConstruct
    private void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    public Charge chargeCreditCard(String token, double cost) {
        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", (int) (cost * 100));
        chargeParams.put("currency", "USD");
        chargeParams.put("source", token);
        try {
            return Charge.create(chargeParams);
        } catch (StripeException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    public Customer getCustomer(String customerId) {
        try {
            return Customer.retrieve(customerId);
        } catch (StripeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    public Charge chargeCustomer(String customerId, double amount) {
        Map<String, Object> chargeMap = new HashMap<>();
        chargeMap.put("amount", amount);
        chargeMap.put("currency", "ALL");
        chargeMap.put("customer", customerId);
        chargeMap.put("source", getCustomer(customerId).getDefaultSource());
        try {
            return Charge.create(chargeMap);
        } catch (StripeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
