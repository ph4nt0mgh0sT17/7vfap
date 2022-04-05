package cz.osu.gamingblogapi.responses;

import cz.osu.gamingblogapi.models.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String username;
    private UserRole userRole;
    private String jwtToken;
}
