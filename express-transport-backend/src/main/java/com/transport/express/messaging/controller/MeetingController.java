package com.transport.express.messaging.controller;

import com.transport.express.messaging.model.Meeting;
import com.transport.express.messaging.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "meetings")
public class MeetingController {
    private final MeetingService meetingService;

    @Autowired
    MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    @PostMapping
    public Meeting appointMeeting(@RequestBody Meeting meeting) {
        return meetingService.createMeeting(meeting);
    }

    @GetMapping
    public List<Meeting> retrieveMeetings() {
        return meetingService.fetchMeetings();
    }
}
