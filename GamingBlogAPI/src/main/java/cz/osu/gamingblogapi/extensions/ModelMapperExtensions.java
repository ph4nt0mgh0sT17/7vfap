package cz.osu.gamingblogapi.extensions;

import cz.osu.gamingblogapi.converters.CategoryCollectionToCategoryResponseListConverter;
import cz.osu.gamingblogapi.models.*;
import cz.osu.gamingblogapi.requests.CreateCategoryRequest;
import cz.osu.gamingblogapi.requests.CreatePostRequest;
import cz.osu.gamingblogapi.requests.RegistrationRequest;
import cz.osu.gamingblogapi.responses.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ModelMapperExtensions {
    public static ModelMapper createModelMapperWithAllMappings() {
        var modelMapper = new ModelMapper();

        addCategoryMappings(modelMapper);
        addUserMappings(modelMapper);
        addPostMappings(modelMapper);
        addPostReactionMappings(modelMapper);
        addPostCommentMappings(modelMapper);

        return modelMapper;
    }

    private static void addCategoryMappings(ModelMapper modelMapper) {
        modelMapper.addMappings(new PropertyMap<Category, CategoryResponse>() {
            @Override
            protected void configure() {
                map().setName(source.getName());
                map().setDescription(source.getDescription());
            }
        });

        modelMapper.addMappings(new PropertyMap<CreateCategoryRequest, Category>() {
            @Override
            protected void configure() {
                map().setId(0L);
                map().setName(source.getName());
                map().setDescription(source.getDescription());
            }
        });
    }

    private static void addUserMappings(ModelMapper modelMapper) {
        modelMapper.addMappings(new PropertyMap<User, LoginResponse>() {
            @Override
            protected void configure() {
                map().setUsername(source.getUsername());
                map().setUserRole(source.getRole());
            }
        });

        modelMapper.addMappings(new PropertyMap<RegistrationRequest, User>() {
            @Override
            protected void configure() {
                map().setUsername(source.getUsername());
                map().setPassword(source.getPassword());
            }
        });
    }

    private static void addPostMappings(ModelMapper modelMapper) {
        modelMapper.addMappings(new PropertyMap<Post, PostResponse>() {
            @Override
            protected void configure() {
                map().setId(source.getId());
                map().setTitle(source.getTitle());
                map().setDescription(source.getDescription());
                map().setHtmlContent(source.getHtmlContent());
                map().setThumbnailUrl(source.getThumbnailUrl());

                map().getCategory().setDescription(source.getCategory().getDescription());
                map().getCategory().setName(source.getCategory().getName());

                map().getAuthor().setUsername(source.getAuthor().getUsername());
                map().getAuthor().setFirstName(source.getAuthor().getFirstName());
                map().getAuthor().setLastName(source.getAuthor().getLastName());
                map().getAuthor().setRole(source.getAuthor().getRole());
                map().getAuthor().setCreationDate(source.getAuthor().getCreationDate());
            }
        });

        modelMapper.addMappings(new PropertyMap<CreatePostRequest, Post>() {
            @Override
            protected void configure() {
                map().setTitle(source.getTitle());
                map().setDescription(source.getDescription());
                map().setHtmlContent(source.getHtmlContent());
            }
        });
    }

    private static void addPostReactionMappings(ModelMapper modelMapper) {
        modelMapper.addMappings(new PropertyMap<PostReaction, PostReactionResponse>() {
            @Override
            protected void configure() {
                map().setReaction(source.getReaction());
                map().setAuthorUsername(source.getAuthor().getUsername());
            }
        });
    }

    private static void addPostCommentMappings(ModelMapper modelMapper) {
        modelMapper.addMappings(new PropertyMap<PostComment, PostCommentResponse>() {
            @Override
            protected void configure() {
                map().setId(source.getId());
                map().setPostId(source.getPost().getId());

                map().getAuthor().setUsername(source.getUser().getUsername());
                map().getAuthor().setFirstName(source.getUser().getFirstName());
                map().getAuthor().setLastName(source.getUser().getLastName());
                map().getAuthor().setRole(source.getUser().getRole());
                map().getAuthor().setCreationDate(source.getUser().getCreationDate());

                map().setText(source.getText());
                map().setCreationDateTime(source.getCreationDateTime());
            }
        });
    }
}
