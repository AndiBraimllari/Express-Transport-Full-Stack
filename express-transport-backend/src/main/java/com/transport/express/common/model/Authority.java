package com.transport.express.common.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;

@Document
public enum Authority implements GrantedAuthority {
    EXECUTIVE("EXECUTIVE", "10", "Individual with highest access"),
    AGENT("AGENT", "20", "Agent responsible for shipments"), // TODO REVISE FOR PROD.
    CLIENT("CLIENT", "30", "Simple client");

    @Id
    private String id;
    private String authority;
    private String roleId;
    private String roleDescription;

    Authority(String authority, String roleId, String roleDescription) {
        this.authority = authority;
        this.roleId = roleId;
        this.roleDescription = roleDescription;
    }

    @Override
    public String getAuthority() {
        return authority;
    }

    public String getId() {
        return id;
    }

    public String getRoleId() {
        return roleId;
    }

    public String getRoleDescription() {
        return roleDescription;
    }
}
