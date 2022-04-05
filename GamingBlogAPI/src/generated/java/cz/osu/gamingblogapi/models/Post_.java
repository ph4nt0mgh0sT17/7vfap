package cz.osu.gamingblogapi.models;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Post.class)
public abstract class Post_ {

	public static volatile SingularAttribute<Post, User> author;
	public static volatile SingularAttribute<Post, String> description;
	public static volatile SingularAttribute<Post, Long> id;
	public static volatile SingularAttribute<Post, String> title;
	public static volatile SingularAttribute<Post, Category> category;
	public static volatile SingularAttribute<Post, String> htmlContent;
	public static volatile SingularAttribute<Post, String> thumbnailUrl;

	public static final String AUTHOR = "author";
	public static final String DESCRIPTION = "description";
	public static final String ID = "id";
	public static final String TITLE = "title";
	public static final String CATEGORY = "category";
	public static final String HTML_CONTENT = "htmlContent";
	public static final String THUMBNAIL_URL = "thumbnailUrl";

}

