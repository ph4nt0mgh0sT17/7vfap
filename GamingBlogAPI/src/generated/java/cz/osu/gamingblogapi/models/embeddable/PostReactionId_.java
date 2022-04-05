package cz.osu.gamingblogapi.models.embeddable;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(PostReactionId.class)
public abstract class PostReactionId_ {

	public static volatile SingularAttribute<PostReactionId, Long> postId;
	public static volatile SingularAttribute<PostReactionId, Long> authorId;

	public static final String POST_ID = "postId";
	public static final String AUTHOR_ID = "authorId";

}

