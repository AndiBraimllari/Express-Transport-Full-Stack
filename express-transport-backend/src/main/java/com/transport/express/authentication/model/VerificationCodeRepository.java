package com.transport.express.authentication.model;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerificationCodeRepository extends MongoRepository<VerificationCode, String> {
    Optional<VerificationCode> findByUserEmail(String userEmail);

    Optional<VerificationCode> findByCode(String code);
}
