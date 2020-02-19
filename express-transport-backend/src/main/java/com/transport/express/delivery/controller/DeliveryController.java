package com.transport.express.delivery.controller;

import com.transport.express.delivery.model.Delivery;
import com.transport.express.delivery.model.DeliveryStatus;
import com.transport.express.delivery.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping(path = "deliveries")
public class DeliveryController {
    private final DeliveryService deliveryService;

    @Autowired
    public DeliveryController(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @PostMapping("/addDelivery")
    public Delivery addDelivery(@RequestBody Delivery delivery) {
        return deliveryService.addDelivery(delivery);
    }

    @PostMapping(path = "/updateDelivery")
    public Delivery updateDelivery(@RequestBody Delivery delivery, @RequestParam DeliveryStatus status,
                                   HttpServletRequest request) {
        return deliveryService.updateDelivery(delivery, status, request);
    }

    @GetMapping
    public List<Delivery> getDeliveries() {
        return deliveryService.getDeliveries();
    }

    @PatchMapping(path = "/couponRedeem/{code}")
    public ResponseEntity<Boolean> passwordReset(@PathVariable("code") String coupon) {
        return deliveryService.redeemCoupon(coupon);
    }
}
