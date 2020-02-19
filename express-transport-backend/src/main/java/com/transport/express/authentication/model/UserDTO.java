package com.transport.express.authentication.model;

import com.transport.express.common.model.Authority;
import com.transport.express.delivery.model.Delivery;
import lombok.Getter;

import java.util.Set;

import static java.util.Collections.emptySet;

@Getter
public class UserDTO {
    private String name;
    private String email;
    private Integer age;
    private String occupation;
    private Set<Authority> authorities = emptySet();
    private Set<Delivery> deliveries = emptySet();
}
