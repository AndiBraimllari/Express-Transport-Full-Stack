package com.transport.express.messaging.model;

import com.transport.express.authentication.model.User;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
@Getter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class Meeting {
    @Id
    private String id;
    private User user;
    private LocalDateTime meetingTime;
    private Boolean valid;

    public Meeting(User user, LocalDateTime meetingTime, Boolean valid) {
        this.user = user;
        this.meetingTime = meetingTime;
        this.valid = valid;
    }
}
