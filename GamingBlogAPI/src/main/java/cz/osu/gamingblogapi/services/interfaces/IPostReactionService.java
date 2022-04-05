package cz.osu.gamingblogapi.services.interfaces;

import cz.osu.gamingblogapi.models.Post;
import cz.osu.gamingblogapi.requests.PostReactionRequest;
import cz.osu.gamingblogapi.responses.PostReactionResponse;

import java.security.Principal;
import java.util.List;

public interface IPostReactionService {
    /**
     * Retrieves all {@link PostReactionResponse} objects that are linked to {@link Post} with postId.
     *
     * @param postId The ID of the {@link Post}.
     * @return The {@link List} of {@link PostReactionResponse} objects.
     */
    List<PostReactionResponse> retrieveAllPostReactionsByPostId(long postId);

    void savePostReaction(PostReactionRequest postReactionRequest, long postId, Principal principal);

    void deletePostReaction(long postId, Principal principal);
}
