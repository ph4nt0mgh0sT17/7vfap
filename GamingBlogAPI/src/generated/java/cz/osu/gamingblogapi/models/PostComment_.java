package cz.osu.gamingblogapi.models;

import java.time.LocalDateTime;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(PostComment.class)
public abstract class PostComment_ {

	public static volatile SingularAttribute<PostComment, Post> post;
	public static volatile SingularAttribute<PostComment, Long> id;
	public static volatile SingularAttribute<PostComment, String> text;
	public static volatile SingularAttribute<PostComment, User> user;
	public static volatile SingularAttribute<PostComment, LocalDateTime> creationDateTime;

	public static final String POST = "post";
	public static final String ID = "id";
	public static final String TEXT = "text";
	public static final String USER = "user";
	public static final String CREATION_DATE_TIME = "creationDateTime";

}

