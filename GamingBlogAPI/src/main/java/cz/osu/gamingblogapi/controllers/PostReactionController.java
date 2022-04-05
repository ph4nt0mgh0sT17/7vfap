package cz.osu.gamingblogapi.controllers;

import cz.osu.gamingblogapi.exceptions.EntityDoesNotExistException;
import cz.osu.gamingblogapi.requests.PostReactionRequest;
import cz.osu.gamingblogapi.services.interfaces.IPostReactionService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/post-reactions")
public class PostReactionController {
    private final IPostReactionService _postReactionService;

    public PostReactionController(IPostReactionService postReactionService) {
        _postReactionService = postReactionService;
    }

    @GetMapping(path = "/{postId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> retrieveReactionsForPost(@PathVariable("postId") long postId) {
        var postReactions = _postReactionService.retrieveAllPostReactionsByPostId(postId);
        return ResponseEntity.ok(postReactions);
    }

    @PostMapping(path = "/{postId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Secured(value = {"ROLE_USER", "ROLE_ADMIN"})
    public ResponseEntity<?> saveReaction(@PathVariable("postId") long postId,
                                          @RequestBody PostReactionRequest postReactionRequest,
                                          Principal principal) {
        _postReactionService.savePostReaction(postReactionRequest, postId, principal);
        return ResponseEntity.accepted().body("OK");
    }

    @DeleteMapping(path = "/{postId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Secured(value = {"ROLE_USER", "ROLE_ADMIN"})
    public ResponseEntity<?> deleteReaction(@PathVariable("postId") long postId, Principal principal) {
        try {
            _postReactionService.deletePostReaction(postId, principal);
        } catch (EntityDoesNotExistException ex) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.accepted().body("OK");
    }
}
