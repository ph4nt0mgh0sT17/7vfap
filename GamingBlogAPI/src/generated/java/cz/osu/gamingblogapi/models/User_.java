package cz.osu.gamingblogapi.models;

import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(User.class)
public abstract class User_ {

	public static volatile SingularAttribute<User, String> firstName;
	public static volatile SingularAttribute<User, String> lastName;
	public static volatile SingularAttribute<User, String> password;
	public static volatile SingularAttribute<User, UserRole> role;
	public static volatile SingularAttribute<User, Long> id;
	public static volatile SingularAttribute<User, LocalDate> creationDate;
	public static volatile SingularAttribute<User, String> username;

	public static final String FIRST_NAME = "firstName";
	public static final String LAST_NAME = "lastName";
	public static final String PASSWORD = "password";
	public static final String ROLE = "role";
	public static final String ID = "id";
	public static final String CREATION_DATE = "creationDate";
	public static final String USERNAME = "username";

}

