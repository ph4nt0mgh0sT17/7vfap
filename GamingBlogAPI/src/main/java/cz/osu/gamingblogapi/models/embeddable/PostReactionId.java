package cz.osu.gamingblogapi.models.embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
public class PostReactionId implements Serializable {
    @Column(name = "author_id")
    private Long authorId;

    @Column(name = "post_id")
    private Long postId;

    public PostReactionId() {

    }
}
