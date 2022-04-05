package cz.osu.gamingblogapi.controllers;

import cz.osu.gamingblogapi.exceptions.EntityAlreadyExistsException;
import cz.osu.gamingblogapi.exceptions.EntityDoesNotExistException;
import cz.osu.gamingblogapi.requests.CreatePostRequest;
import cz.osu.gamingblogapi.responses.PostResponse;
import cz.osu.gamingblogapi.services.interfaces.IPostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
@Slf4j
public class PostController {
    private final IPostService _postService;

    public PostController(IPostService postService) {
        _postService = postService;
    }

    @GetMapping(path = "/{postId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> retrievePostById(@PathVariable(name = "postId") long postId) {
        try {
            var post = _postService.retrieveById(postId);
            return ResponseEntity.ok(post);
        } catch (EntityDoesNotExistException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(path = "reviews/latest")
    public ResponseEntity<?> retrieveLatestPosts(@RequestParam Optional<Integer> skip) {
        List<PostResponse> latestPosts;

        if (skip.isEmpty())
            latestPosts = _postService.retrieveLatestPosts(4, "Recenze");
        else
            latestPosts = _postService.retrieveLatestPosts(3, skip.get(), "Recenze");

        return ResponseEntity.ok(latestPosts);
    }

    @GetMapping(path = "articles/latest")
    public ResponseEntity<?> retrieveLatestArticles(@RequestParam Optional<Integer> skip) {
        List<PostResponse> latestPosts;

        if (skip.isEmpty())
            latestPosts = _postService.retrieveLatestPosts(4, "Článek");
        else
            latestPosts = _postService.retrieveLatestPosts(3, skip.get(), "Článek");

        return ResponseEntity.ok(latestPosts);
    }

    @GetMapping(path = "first-feelings/latest")
    public ResponseEntity<?> retrieveLatestFirstFeelings(@RequestParam Optional<Integer> skip) {
        List<PostResponse> latestPosts;

        if (skip.isEmpty())
            latestPosts = _postService.retrieveLatestPosts(4, "První dojmy");
        else
            latestPosts = _postService.retrieveLatestPosts(3, skip.get(), "První dojmy");

        return ResponseEntity.ok(latestPosts);
    }

    @PostMapping
    @Secured(value = {"ROLE_ADMIN"})
    public ResponseEntity<?> createNewPost(@RequestBody CreatePostRequest createPostRequest) {
        try {
            _postService.createPost(createPostRequest);
        } catch (EntityAlreadyExistsException ex) {
            return ResponseEntity
                    .badRequest()
                    .body("Cannot create the post because there is already existing post with title: '" +
                            createPostRequest.getTitle() + "'."
                    );
        } catch (EntityDoesNotExistException ex) {
            return ResponseEntity
                    .notFound().build();
        }

        return ResponseEntity.status(HttpStatus.ACCEPTED).body("The post was successfully created.");
    }

    @PutMapping("/{postId}")
    @Secured(value = {"ROLE_ADMIN"})
    public ResponseEntity<?> editPost(@RequestBody CreatePostRequest createPostRequest, @PathVariable long postId) {
        try {
            _postService.editPost(createPostRequest, postId);
        } catch (EntityAlreadyExistsException e) {
            return ResponseEntity
                    .badRequest()
                    .body("Cannot edit the post because there is already existing post with title: '" +
                            createPostRequest.getTitle() + "'."
                    );
        } catch (EntityDoesNotExistException ex) {
            return ResponseEntity
                    .notFound().build();
        }

        return ResponseEntity.status(HttpStatus.ACCEPTED).body("The post was successfully edited.");
    }

    @DeleteMapping("/{postId}")
    @Secured(value = {"ROLE_ADMIN"})
    public ResponseEntity<?> deletePost(@PathVariable long postId) {
        try {
            _postService.delete(postId);
        } catch (EntityDoesNotExistException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The post with id (" + postId +") does not exist.");
        }

        return ResponseEntity.status(HttpStatus.ACCEPTED).body("The post with id (" + postId + ") was successfully deleted.");
    }

}
