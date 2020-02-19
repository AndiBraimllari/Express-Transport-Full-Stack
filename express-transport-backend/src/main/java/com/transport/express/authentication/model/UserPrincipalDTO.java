package com.transport.express.authentication.model;

import lombok.Getter;

@Getter
public class UserPrincipalDTO {
    private String email;
    private Character[] password;
    private boolean enabled;
}
