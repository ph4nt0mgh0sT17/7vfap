package cz.osu.gamingblogapi.services.interfaces;

import cz.osu.gamingblogapi.responses.UserResponse;

import java.util.List;

public interface IUserService {
    List<UserResponse> retrieveAllUsers();
}
