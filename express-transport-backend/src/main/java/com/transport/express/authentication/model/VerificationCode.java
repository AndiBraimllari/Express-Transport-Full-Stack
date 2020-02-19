package com.transport.express.authentication.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Document
@NoArgsConstructor
public class VerificationCode {
    public enum VerificationType {
        ENABLE_ACCOUNT, RESET_PASSWORD, COUPON
    }

    @Id
    private String id;
    private String userEmail;
    private String code;
    private LocalDateTime issuingDateTime;
    private LocalDateTime expirationDateTime;
    private LocalDateTime verificationDateTime;
    private VerificationType verificationType;
    private boolean used;

    public VerificationCode(String userEmail, VerificationType verificationType) {
        this.userEmail = userEmail;
        this.issuingDateTime = LocalDateTime.now(); // TODO REVISE FOR PROD. CONSIDERING TIME ZONES AND SAVINGS
        this.code = UUID.randomUUID().toString().substring(0, 8); // TODO REVISE FOR PROD.
        this.expirationDateTime = issuingDateTime.plusDays(1);
        this.verificationType = verificationType;
    }
}
