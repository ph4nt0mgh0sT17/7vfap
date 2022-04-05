package cz.osu.gamingblogapi.repositories;

import cz.osu.gamingblogapi.models.PostReaction;
import cz.osu.gamingblogapi.models.embeddable.PostReactionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPostReactionRepository extends JpaRepository<PostReaction, PostReactionId>, JpaSpecificationExecutor<PostReaction> {
}
