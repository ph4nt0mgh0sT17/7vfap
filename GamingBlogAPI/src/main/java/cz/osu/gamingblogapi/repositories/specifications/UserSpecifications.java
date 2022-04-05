package cz.osu.gamingblogapi.repositories.specifications;

import cz.osu.gamingblogapi.models.User;
import cz.osu.gamingblogapi.models.User_;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserSpecifications {
    public static Specification<User> hasUsername(String username) {
        return (user, cq, cb) -> cb.equal(user.get(User_.USERNAME), username);
    }
}
