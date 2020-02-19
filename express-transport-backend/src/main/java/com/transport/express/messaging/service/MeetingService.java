package com.transport.express.messaging.service;

import com.transport.express.messaging.model.Meeting;
import com.transport.express.messaging.model.MeetingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeetingService {
    private final MeetingRepository meetingRepository;

    MeetingService(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    public Meeting createMeeting(Meeting meeting) {
        return meetingRepository.save(meeting);
    }

    public List<Meeting> fetchMeetings() {
        return meetingRepository.findAll();
    }
}
