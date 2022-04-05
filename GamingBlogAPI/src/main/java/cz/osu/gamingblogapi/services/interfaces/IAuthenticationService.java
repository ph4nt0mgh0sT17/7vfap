package cz.osu.gamingblogapi.services.interfaces;

import cz.osu.gamingblogapi.requests.LoginRequest;
import cz.osu.gamingblogapi.requests.RegistrationRequest;
import cz.osu.gamingblogapi.responses.LoginResponse;

public interface IAuthenticationService {
    /**
     * Logins the user via {@link LoginRequest} into the system.
     * @param loginRequest The object containing the username and password.
     * @return The {@link LoginResponse} object containing the logged username, role and JWT token.
     */
    LoginResponse login(LoginRequest loginRequest);

    /**
     * Registers the user (ROLE_USER) in the system.
     * @param registrationRequest The object containing information about the user. (Username and Password)
     */
    void register(RegistrationRequest registrationRequest);
}
