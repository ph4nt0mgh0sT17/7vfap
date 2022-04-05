package cz.osu.gamingblogapi.services.interfaces;

public interface IJwtService {
    /**
     * Creates a JWT token that is used for authentication/authorization.
     *
     * @param username The username of the user the JWT token is for.
     * @param role     The role of the user the JWT token is for.
     * @return The JWT token String representation.
     */
    String createJwtToken(String username, String role);
}
