package cz.osu.gamingblogapi.repositories.specifications;

import cz.osu.gamingblogapi.models.*;
import cz.osu.gamingblogapi.models.embeddable.PostReactionId_;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.JoinType;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PostCommentSpecifications {
    public static Specification<PostComment> findByPostId(long postId) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            root.fetch(PostComment_.post, JoinType.INNER);
            root.fetch(PostComment_.user, JoinType.INNER);

            criteriaQuery.orderBy(criteriaBuilder.asc(root.get(PostComment_.creationDateTime)));

            return criteriaBuilder.equal(root.get(PostComment_.post).get(Post_.id), postId);
        };
    }

    public static Specification<PostComment> findByPostCommentId(long postCommentId) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            root.fetch(PostComment_.post, JoinType.INNER);
            root.fetch(PostComment_.user, JoinType.INNER);

            return criteriaBuilder.equal(root.get(PostComment_.id), postCommentId);
        };
    }

    public static Specification<PostComment> findByAuthorUserame(String authorUsername) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            root.fetch(PostComment_.post, JoinType.INNER);
            root.fetch(PostComment_.user, JoinType.INNER);
            return criteriaBuilder.equal(root.get(PostComment_.user).get(User_.username), authorUsername);
        };
    }
}
