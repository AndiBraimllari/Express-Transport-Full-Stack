package com.transport.express.authentication.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class UserPrincipal { // Should contain only data required for authentication
    @Id
    private ObjectId id;
    private User user;
    private Character[] password;
    private boolean enabled;

    public static final class Builder {
        private UserPrincipal principal;

        public Builder() {
            principal = new UserPrincipal();
        }

        public Builder setUser(User user) {
            this.principal.user = user;
            return this;
        }

        public Builder setPassword(Character[] password) {
            this.principal.password = password;
            return this;
        }

        public Builder setEnabled(boolean enabled) {
            this.principal.enabled = enabled;
            return this;
        }

        public UserPrincipal build() {
            principal.setId(new ObjectId());
            return principal;
        }
    }

    private void setId(ObjectId id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setPassword(Character[] password) {
        this.password = password;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public User getUser() {
        return user;
    }

    public Character[] getPassword() {
        return password;
    }

    public boolean isEnabled() {
        return enabled;
    }
}
