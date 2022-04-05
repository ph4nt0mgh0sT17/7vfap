package cz.osu.gamingblogapi.models;

import cz.osu.gamingblogapi.models.embeddable.PostReactionId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "post_reaction")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostReaction {
    @EmbeddedId
    private PostReactionId id = new PostReactionId();

    @Convert(converter = PostReactionItemConverter.class)
    @Column(name = "reaction", nullable = false)
    private PostReactionItem reaction;

    @ManyToOne(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @MapsId("authorId")
    @JoinColumn(name = "author_id")
    private User author;

    @ManyToOne(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @MapsId("postId")
    @JoinColumn(name = "post_id")
    private Post post;
}
