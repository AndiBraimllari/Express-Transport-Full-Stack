package com.transport.express.delivery.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.List;

@Document
@Getter
@Setter
@NoArgsConstructor
public class Delivery {
    @Id
    private String id = new ObjectId().toHexString();
    private String name;
    private Integer weight;
    private BigDecimal cost;
    private DeliveryLocation currentLocation;
    private List<DeliveryLocation> locations;
    private DeliveryStatus status = DeliveryStatus.ONGOING;

    public Delivery(String name, Integer weight, BigDecimal cost, DeliveryStatus status,
                    DeliveryLocation currentLocation) {
        this.name = name;
        this.weight = weight;
        this.cost = cost;
        this.status = status;
        this.currentLocation = currentLocation;
    }
}
