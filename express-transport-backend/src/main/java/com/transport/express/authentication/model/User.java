package com.transport.express.authentication.model;

import com.transport.express.common.model.Authority;
import com.transport.express.delivery.model.Delivery;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Objects;
import java.util.Set;

import static java.util.Collections.emptySet;

@Document
public class User {
    @Id
    private ObjectId id;
    private String name;
    private String email;
    private Integer age;
    private String occupation;
    private Set<Authority> authorities = emptySet();
    private Set<Delivery> deliveries = emptySet(); // all kinds of deliveries, taken, put in market, etc

    public static class Builder {
        private User user;

        public Builder() {
            user = new User();
        }

        public Builder setName(String name) {
            this.user.setName(name);
            return this;
        }

        public Builder setEmail(String email) {
            this.user.setEmail(email);
            return this;
        }

        public Builder setPassword(Integer age) {
            this.user.setAge(age);
            return this;
        }

        public Builder setAuthorities(Set<Authority> authorities) {
            this.user.setAuthorities(authorities);
            return this;
        }

        public Builder setDeliveries(Set<Delivery> deliveries) {
            this.user.setDeliveries(deliveries);
            return this;
        }

        public User build() {
            return user;
        }

    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

    public void setDeliveries(Set<Delivery> deliveries) {
        this.deliveries = deliveries;
    }

    public ObjectId getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Integer getAge() {
        return age;
    }

    public String getOccupation() {
        return occupation;
    }

    public Set<Delivery> getDeliveries() {
        return deliveries;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", age=" + age +
                ", occupation='" + occupation + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) &&
                Objects.equals(name, user.name) &&
                Objects.equals(email, user.email) &&
                Objects.equals(age, user.age) &&
                Objects.equals(occupation, user.occupation) &&
                Objects.equals(authorities, user.authorities);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, email, age, occupation, authorities);
    }
}
