package com.transport.express.payment.controller;

import com.stripe.model.Charge;
import com.transport.express.payment.mervice.StripeClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("payments")
public class PaymentController {
    private StripeClientService stripeService;

    PaymentController() {
    }

    @Autowired
    PaymentController(StripeClientService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping(path = "/charge/{token}")
    public Charge chargeCard(@PathVariable(value = "token") String token, @RequestBody Integer cost) {
        return stripeService.chargeCreditCard(token, cost);
    }
}
