package cz.osu.gamingblogapi.requests;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CreatePostRequest {
    private String title;
    private String description;
    private String htmlContent;
    private String imageName;
    private String category;
    private String authorUsername;
}
