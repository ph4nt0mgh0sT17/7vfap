package cz.osu.gamingblogapi.services.interfaces;

import cz.osu.gamingblogapi.exceptions.EntityAlreadyExistsException;
import cz.osu.gamingblogapi.exceptions.EntityDoesNotExistException;
import cz.osu.gamingblogapi.requests.CreatePostRequest;
import cz.osu.gamingblogapi.responses.PostResponse;

import java.util.List;

public interface IPostService {
    /**
     * Retrieves latest posts in the system.
     *
     * @return The {@link List} of {@link PostResponse} objects.
     */
    List<PostResponse> retrieveLatestPosts(int postsNumber, String categoryName);

    List<PostResponse> retrieveLatestPosts(int postsNumber, int skipNumber, String categoryName);

    /**
     * Retrieve a {@link PostResponse} by given {@code postId}.
     *
     * @param postId The ID of the post that is being searched.
     * @return The {@link PostResponse} if the post is found.
     * @throws EntityDoesNotExistException if the post is not found.
     */
    PostResponse retrieveById(long postId);

    /**
     * Creates a post in the system.
     *
     * @param createPostRequest The object containing all information about the post that is requested to be created.
     * @throws EntityDoesNotExistException  if the category or the author is not found in the system.
     * @throws EntityAlreadyExistsException if there is already existing post with given name.
     */
    void createPost(CreatePostRequest createPostRequest);

    /**
     * Edits an existing post in the system.
     *
     * @param createPostRequest The object containing all information about the post that is requested to be created.
     * @param id                The ID of the post that is being edited.
     * @throws EntityDoesNotExistException  if category or author is not found in the system.
     * @throws EntityAlreadyExistsException if there is already existing post with given name.
     */
    void editPost(CreatePostRequest createPostRequest, long id);

    /**
     * Deletes the post with given {@code postId}.
     *
     * @param postId The ID of the post that is requested to be deleted.
     * @throws EntityDoesNotExistException if the post does not exist.
     */
    void delete(long postId);
}
