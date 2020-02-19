package com.transport.express.delivery.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryLocation {
    private BigDecimal latitude;
    private BigDecimal longitude;
}
