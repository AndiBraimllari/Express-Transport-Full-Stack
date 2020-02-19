package com.transport.express.authentication.controller;

import com.transport.express.authentication.model.User;
import com.transport.express.authentication.model.UserPrincipal;
import com.transport.express.authentication.model.UserPrincipalDTO;
import com.transport.express.authentication.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "users")
public class UserController {
    private final UserService userService;
    private final ModelMapper modelMapper;

    @Autowired
    public UserController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping(path = "/authentication")
    public ResponseEntity<?> authentication(@RequestBody UserPrincipalDTO principalDTO) {
        return userService.signin(modelMapper.map(principalDTO, UserPrincipal.class));
    }

    @PostMapping(path = "/createUser")
    public User createUser(@RequestBody Object userPrincipalDTO) {
        return userService.createUser((UserPrincipal) userPrincipalDTO);
    }

    @DeleteMapping(path = "/deleteUser/{userId}")
    public User deleteUser(@PathVariable(value = "userId") String userId) {
        return userService.deleteUser(userId);
    }

    @PatchMapping(path = "/enableAccount/{code}")
    public ResponseEntity<?> enableAccount(@RequestBody String password, @PathVariable("code") String code) {
        return userService.enableAccount(password, code);
    }

    @PutMapping(path = "/enabled") // TODO REVISE REST VERB IN DEV.
    public ResponseEntity<Boolean> isAccountEnabled(@RequestBody String email) {
        return userService.isAccountEnabled(email);
    }

    @PostMapping(path = "/passwordResetRequest")
    public ResponseEntity<Boolean> passwordResetRequest(@RequestBody UserPrincipalDTO principalDTO) {
        return userService.requestPasswordReset(modelMapper.map(principalDTO, UserPrincipal.class));
    }

    @PatchMapping(path = "/passwordReset/{code}")
    public ResponseEntity<Boolean> passwordReset(@RequestBody Object principalDTO, @PathVariable("code") String code) {
        return userService.resetPassword((UserPrincipal) principalDTO, code);
    }
}
