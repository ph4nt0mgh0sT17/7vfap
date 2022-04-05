package cz.osu.gamingblogapi.models;

import cz.osu.gamingblogapi.models.embeddable.PostReactionId;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(PostReaction.class)
public abstract class PostReaction_ {

	public static volatile SingularAttribute<PostReaction, PostReactionItem> reaction;
	public static volatile SingularAttribute<PostReaction, Post> post;
	public static volatile SingularAttribute<PostReaction, User> author;
	public static volatile SingularAttribute<PostReaction, PostReactionId> id;

	public static final String REACTION = "reaction";
	public static final String POST = "post";
	public static final String AUTHOR = "author";
	public static final String ID = "id";

}

