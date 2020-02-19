package com.transport.express.authentication.service;

import com.transport.express.authentication.model.UserGroupsRepository;
import com.transport.express.common.model.Authority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserGroupsService {
    private final UserGroupsRepository userGroupsRepository;

    @Autowired
    public UserGroupsService(UserGroupsRepository userGroupsRepository) {
        this.userGroupsRepository = userGroupsRepository;
    }

    public void createUserRole(Authority authority) {
        userGroupsRepository.insert(authority);
    }
}
