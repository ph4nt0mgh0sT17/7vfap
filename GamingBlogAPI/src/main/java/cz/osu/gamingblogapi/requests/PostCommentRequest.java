package cz.osu.gamingblogapi.requests;

import cz.osu.gamingblogapi.responses.AuthorResponse;
import cz.osu.gamingblogapi.responses.PostResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostCommentRequest {
    private String text;
}
