package cz.osu.gamingblogapi.controllers;

import cz.osu.gamingblogapi.exceptions.EntityDoesNotExistException;
import cz.osu.gamingblogapi.exceptions.NotOwnPostCommentException;
import cz.osu.gamingblogapi.requests.PostCommentRequest;
import cz.osu.gamingblogapi.services.interfaces.IPostCommentService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/post-comments")
public class PostCommentController {
    private final IPostCommentService _postCommentService;

    public PostCommentController(IPostCommentService postCommentService) {
        _postCommentService = postCommentService;
    }

    @GetMapping(path = "/{postId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> retrieveCommentsForPost(@PathVariable("postId") long postId) {
        var postComments = _postCommentService.retrieveAllPostCommentsByPostId(postId);
        return ResponseEntity.ok(postComments);
    }

    @PostMapping("/{postId}")
    @Secured(value = {"ROLE_USER", "ROLE_ADMIN"})
    public ResponseEntity<?> createPostComment(@PathVariable("postId") long postId,
                                               @RequestBody PostCommentRequest postCommentRequest,
                                               Principal principal) {
        try {
            _postCommentService.create(postCommentRequest, postId, principal);
        } catch (EntityDoesNotExistException ex) {
            return ResponseEntity.notFound().build();
        } catch (IllegalStateException ex) {
            return ResponseEntity.badRequest().body("Cannot create the post comment.");
        }

        return ResponseEntity.accepted().body("The post comment is successfully created.");
    }

    @DeleteMapping("/{postCommentId}")
    @Secured(value = {"ROLE_USER", "ROLE_ADMIN"})
    public ResponseEntity<?> deletePostComment(@PathVariable("postCommentId") long postCommentId,
                                               Principal principal) {
        try {
            _postCommentService.delete(postCommentId, principal);
        } catch (EntityDoesNotExistException ex) {
            return ResponseEntity.notFound().build();
        } catch (NotOwnPostCommentException ex) {
            return ResponseEntity.badRequest()
                    .body("Cannot delete the post comment with id: " +
                            postCommentId + ", because it's not owned by user: '" +
                            principal.getName() + "'"
                    );
        } catch (IllegalStateException ex) {
            return ResponseEntity.badRequest().body("Cannot delete the post comment with id: " + postCommentId);
        }

        return ResponseEntity.accepted().body("The post comment is successfully deleted.");
    }
}
