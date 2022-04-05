package cz.osu.gamingblogapi.repositories.specifications;

import cz.osu.gamingblogapi.models.*;
import cz.osu.gamingblogapi.models.embeddable.PostReactionId_;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.JoinType;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PostReactionSpecifications {
    public static Specification<PostReaction> findByPostId(long postId) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            root.fetch(PostReaction_.post, JoinType.INNER);
            root.fetch(PostReaction_.author, JoinType.INNER);
            return criteriaBuilder.equal(root.get(PostReaction_.id).get(PostReactionId_.POST_ID), postId);
        };
    }

    public static Specification<PostReaction> findByAuthorUserame(String authorUsername) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            root.fetch(PostReaction_.post, JoinType.INNER);
            root.fetch(PostReaction_.author, JoinType.INNER);
            return criteriaBuilder.equal(root.get(PostReaction_.author).get(User_.username), authorUsername);
        };
    }
}
