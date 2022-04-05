package cz.osu.gamingblogapi.services;

import cz.osu.gamingblogapi.exceptions.EntityAlreadyExistsException;
import cz.osu.gamingblogapi.exceptions.EntityDoesNotExistException;
import cz.osu.gamingblogapi.models.Post;
import cz.osu.gamingblogapi.repositories.ICategoryRepository;
import cz.osu.gamingblogapi.repositories.IPostRepository;
import cz.osu.gamingblogapi.repositories.IUserRepository;
import cz.osu.gamingblogapi.repositories.OffsetBasedPageRequest;
import cz.osu.gamingblogapi.requests.CreatePostRequest;
import cz.osu.gamingblogapi.responses.PostResponse;
import cz.osu.gamingblogapi.services.interfaces.IPostService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

import static cz.osu.gamingblogapi.repositories.specifications.CategorySpecifications.hasName;
import static cz.osu.gamingblogapi.repositories.specifications.UserSpecifications.hasUsername;

@Service
public class PostService implements IPostService {
    private final IPostRepository _postRepository;
    private final IUserRepository _userRepository;
    private final ICategoryRepository _categoryRepository;
    private final ModelMapper _modelMapper;

    public PostService(IPostRepository _postRepository, ModelMapper _modelMapper, IUserRepository userRepository,
                       ICategoryRepository categoryRepository) {
        this._postRepository = _postRepository;
        this._modelMapper = _modelMapper;
        this._userRepository = userRepository;
        this._categoryRepository = categoryRepository;
    }

    @Override
    public List<PostResponse> retrieveLatestPosts(int postsNumber, String categoryName) {
        var category = _categoryRepository.findOne(hasName(categoryName))
                .orElseThrow(EntityDoesNotExistException::new);

        var latestPosts = _postRepository.retrieveLatestPosts(
                category.getName(), PageRequest.of(0, 4)
        );

        return latestPosts.stream()
                .map(x -> _modelMapper.map(x, PostResponse.class))
                .toList();
    }

    public List<PostResponse> retrieveLatestPosts(int postsNumber, int skipNumber, String categoryName) {
        var category = _categoryRepository.findOne(hasName(categoryName))
                .orElseThrow(EntityDoesNotExistException::new);

        var latestPosts = _postRepository.retrieveLatestPosts(
                category.getName(),
                new OffsetBasedPageRequest(skipNumber, postsNumber)
        );

        return latestPosts.stream()
                .map(x -> _modelMapper.map(x, PostResponse.class))
                .toList();
    }

    @Override
    public PostResponse retrieveById(long postId) {
        var post = _postRepository.findById(postId)
                .orElseThrow(EntityDoesNotExistException::new);

        return _modelMapper.map(post, PostResponse.class);
    }

    @Override
    public void createPost(CreatePostRequest createPostRequest) {
        var author = _userRepository.findOne(hasUsername(createPostRequest.getAuthorUsername()))
                .orElseThrow(EntityDoesNotExistException::new);

        var category = _categoryRepository.findOne(hasName(createPostRequest.getCategory()))
                .orElseThrow(EntityDoesNotExistException::new);

        var post = _modelMapper.map(createPostRequest, Post.class);
        post.setId(0L);
        post.setTitle(createPostRequest.getTitle());
        post.setDescription(createPostRequest.getDescription());
        post.setHtmlContent(createPostRequest.getHtmlContent());
        post.setThumbnailUrl("/images/thumbnails/" + createPostRequest.getImageName());
        post.setAuthor(author);
        post.setCategory(category);

        try {
            _postRepository.save(post);
        } catch (Exception ex) {
            throw new EntityAlreadyExistsException("Post");
        }
    }

    @Override
    public void editPost(CreatePostRequest createPostRequest, long id) {
        var author = _userRepository.findOne(hasUsername(createPostRequest.getAuthorUsername()))
                .orElseThrow(EntityDoesNotExistException::new);

        var category = _categoryRepository.findOne(hasName(createPostRequest.getCategory()))
                .orElseThrow(EntityDoesNotExistException::new);

        var post = _modelMapper.map(createPostRequest, Post.class);
        post.setId(id);
        post.setTitle(createPostRequest.getTitle());
        post.setDescription(createPostRequest.getDescription());
        post.setHtmlContent(createPostRequest.getHtmlContent());
        post.setThumbnailUrl("/images/thumbnails/" + createPostRequest.getImageName());
        post.setAuthor(author);
        post.setCategory(category);

        try {
            _postRepository.save(post);
        } catch (Exception ex) {
            throw new EntityAlreadyExistsException("Post");
        }
    }

    @Override
    public void delete(long postId) {
        try {
            _postRepository.deleteById(postId);
        } catch (Exception ex) {
            throw new EntityDoesNotExistException();
        }
    }
}
