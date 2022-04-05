package cz.osu.gamingblogapi.repositories.specifications;

import cz.osu.gamingblogapi.models.Category;
import cz.osu.gamingblogapi.models.Category_;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CategorySpecifications {
    public static Specification<Category> hasName(String categoryName) {
        return (category, cq, cb) -> cb.equal(category.get(Category_.NAME), categoryName);
    }
}
