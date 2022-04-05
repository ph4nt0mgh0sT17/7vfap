package cz.osu.gamingblogapi.services;

import cz.osu.gamingblogapi.exceptions.EntityDoesNotExistException;
import cz.osu.gamingblogapi.exceptions.NotOwnPostCommentException;
import cz.osu.gamingblogapi.models.PostComment;
import cz.osu.gamingblogapi.repositories.IPostCommentRepository;
import cz.osu.gamingblogapi.repositories.IPostRepository;
import cz.osu.gamingblogapi.repositories.IUserRepository;
import cz.osu.gamingblogapi.repositories.specifications.PostCommentSpecifications;
import cz.osu.gamingblogapi.requests.PostCommentRequest;
import cz.osu.gamingblogapi.responses.PostCommentResponse;
import cz.osu.gamingblogapi.services.interfaces.IPostCommentService;
import org.modelmapper.ModelMapper;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static cz.osu.gamingblogapi.repositories.specifications.PostCommentSpecifications.*;
import static cz.osu.gamingblogapi.repositories.specifications.UserSpecifications.hasUsername;

@Service
public class PostCommentService implements IPostCommentService {
    private final IPostCommentRepository _postCommentRepository;
    private final IPostRepository _postRepository;
    private final IUserRepository _userRepository;
    private final ModelMapper _modelMapper;

    public PostCommentService(IPostCommentRepository postCommentRepository, IPostRepository postRepository,
                              IUserRepository userRepository, ModelMapper modelMapper) {
        _postCommentRepository = postCommentRepository;
        _postRepository = postRepository;
        _userRepository = userRepository;
        _modelMapper = modelMapper;
    }

    @Override
    public List<PostCommentResponse> retrieveAllPostCommentsByPostId(long postId) {
        var postComments = _postCommentRepository.findAll(findByPostId(postId));

        return postComments.stream()
                .map(x -> _modelMapper.map(x, PostCommentResponse.class))
                .toList();
    }

    @Override
    public void create(PostCommentRequest postCommentRequest, long postId, Principal principal) {
        var author = _userRepository.findOne(hasUsername(principal.getName()))
                .orElseThrow(EntityDoesNotExistException::new);
        var post = _postRepository.findById(postId)
                .orElseThrow(EntityDoesNotExistException::new);

        var postComment = new PostComment(0L, post, author, postCommentRequest.getText(), LocalDateTime.now());

        try {
            _postCommentRepository.save(postComment);
        } catch (Exception ex) {
            throw new IllegalStateException("Could not save the post comment.", ex);
        }
    }

    @Override
    public void delete(long postCommentId, Principal principal) {
        var postComment = _postCommentRepository.findOne(findByPostCommentId(postCommentId))
                .orElseThrow(EntityDoesNotExistException::new);

        if (!postComment.getUser().getUsername().equals(principal.getName()))
            throw new NotOwnPostCommentException();

        try {
            _postCommentRepository.deleteById(postCommentId);
        } catch (EmptyResultDataAccessException ex) {
            throw new EntityDoesNotExistException();
        } catch (Exception ex) {
            throw new IllegalStateException("Cannot delete the post comment with id: " + postCommentId);
        }
    }
}
