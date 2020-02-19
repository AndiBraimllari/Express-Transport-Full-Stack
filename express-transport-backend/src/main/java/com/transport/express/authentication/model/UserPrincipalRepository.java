package com.transport.express.authentication.model;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserPrincipalRepository extends MongoRepository<UserPrincipal, String> {

    default Optional<UserPrincipal> findByEmail(String email) {
        return findAll().stream().filter(principal -> principal.getUser().getEmail().equals(email)).findAny();
    }

}
