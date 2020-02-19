package com.transport.express.messaging;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessagingWebSocket {
    @MessageMapping("/send/message")
    @SendTo("/chat")
    public Object onReceivedMesage(String message) {
        System.out.println("Received message:" + message);
        return "You are talking to a bot, please wait a bit longer!";
    }
}
