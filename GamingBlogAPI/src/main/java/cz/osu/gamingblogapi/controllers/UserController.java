package cz.osu.gamingblogapi.controllers;

import cz.osu.gamingblogapi.responses.UserResponse;
import cz.osu.gamingblogapi.services.interfaces.IUserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@Secured(value = {"ROLE_ADMIN"})
public class UserController {
    private final IUserService _userService;

    public UserController(IUserService userService) {
        _userService = userService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserResponse>> retrieveAllUsers() {
        return ResponseEntity.ok(_userService.retrieveAllUsers());
    }
}
