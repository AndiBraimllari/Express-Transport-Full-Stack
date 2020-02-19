package com.transport.express.common.service;

import com.transport.express.authentication.model.VerificationCode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.*;

import static java.lang.String.*;
import static java.util.Comparator.*;
import static java.util.stream.Collectors.*;

@Service
public class MailingService {
    private static final Logger LOGGER = LoggerFactory.getLogger(MailingService.class);
    private final MongoTemplate mongoTemplate;

    public MailingService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public void sendVerificationMail(String receiver) {
        List<VerificationCode> verificationCodes = mongoTemplate.findAll(VerificationCode.class)
                .stream().filter(Objects::nonNull)
                .filter(code -> code.getVerificationType().equals(VerificationCode.VerificationType.ENABLE_ACCOUNT))
                .filter(code -> !code.isUsed()).collect(toList());

        Optional<VerificationCode> verificationCode = verificationCodes.stream()
                .filter(code -> !code.isUsed()).max(comparing(VerificationCode::getIssuingDateTime));

        if (verificationCode.isPresent()) {
            sendMail(receiver, "Email Verification",
                    format("Your verification code for express-transport is: %s", verificationCode.get().getCode()));
            LOGGER.info("SENT ACCOUNT VERIFICATION CODE E-MAIL TO [{}]", receiver);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Verification code for your account was not found");
        }
    }

    public void sendPasswordResetRequestMail(String receiver) {
        List<VerificationCode> verificationCodes = mongoTemplate.findAll(VerificationCode.class)
                .stream().filter(Objects::nonNull)
                .filter(code -> code.getVerificationType().equals(VerificationCode.VerificationType.RESET_PASSWORD))
                .filter(code -> !code.isUsed()).collect(toList());

        Optional<VerificationCode> verificationCode = verificationCodes.stream()
                .max(comparing(VerificationCode::getIssuingDateTime));

        if (verificationCode.isPresent()) {
            sendMail(receiver, "Password Reset Request",
                    format("Your password reset code for express-transport is: %s", verificationCode.get().getCode()));
            LOGGER.info("SENT PASSWORD RESET CODE E-MAIL TO [{}]", receiver);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Verification code for your account was not found");
        }
    }

    public void sendExceptionMail(String cause, String exception) {
        sendMail("EXCEPTION_MAIL", "Issue ocurred", cause + "\n" + exception);
    }

    private void sendMail(String receiver, String subject, String text) {
        Session session = createMailingSession();
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("FROM_MAIL"));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(receiver)
            );
            message.setSubject(subject);
            message.setText(text);

            Transport.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    private Session createMailingSession() { // TODO CHANGE IN PROD., ALSO PUT PROPERTIES IN FILE SYSTEM
        final String username = "EMAIL";
        final String password = "PASSWORD";
        Properties prop = new Properties();
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true");
        return Session.getInstance(prop,
                new Authenticator() {
                    @Override
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });
    }
}
