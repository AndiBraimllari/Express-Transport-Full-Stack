package com.transport.express.authentication.controller;

import com.transport.express.authentication.service.UserGroupsService;
import com.transport.express.common.model.Authority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "userGroups")
public class UserGroupsController {
    private final UserGroupsService userGroupsService;

    @Autowired
    public UserGroupsController(UserGroupsService userGroupsService) {
        this.userGroupsService = userGroupsService;
    }

    @PostMapping(path = "createRole")
    public void createUserRole(@RequestBody Authority authority) {
        userGroupsService.createUserRole(authority);
    }
}
