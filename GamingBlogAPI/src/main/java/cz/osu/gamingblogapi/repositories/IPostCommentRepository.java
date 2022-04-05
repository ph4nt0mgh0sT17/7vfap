package cz.osu.gamingblogapi.repositories;

import cz.osu.gamingblogapi.models.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IPostCommentRepository extends JpaRepository<PostComment, Long>, JpaSpecificationExecutor<PostComment> {
}
