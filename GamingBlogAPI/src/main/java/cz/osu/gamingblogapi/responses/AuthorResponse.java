package cz.osu.gamingblogapi.responses;

import com.fasterxml.jackson.annotation.JsonFormat;
import cz.osu.gamingblogapi.models.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthorResponse {
    private String username;
    private String firstName;
    private String lastName;
    private UserRole role;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate creationDate;
}
