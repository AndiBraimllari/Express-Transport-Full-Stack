package com.transport.express.common;

import com.transport.express.common.service.MailingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionReporter {
    private final MailingService mailingService;
    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionReporter.class);

    GlobalExceptionReporter(MailingService mailingService) {
        this.mailingService = mailingService;
    }

    @ExceptionHandler({Exception.class})
    public void noHandlerFoundException(Exception exception) throws Exception {
        LOGGER.warn("Exception [{}] occurred and will be mailed promptly", exception.getMessage());
//        mailingService.sendExceptionMail(ex.toString(), Arrays.toString(ex.getStackTrace())); // TODO ENABLE IN PROD.
        throw exception;
    }
}
