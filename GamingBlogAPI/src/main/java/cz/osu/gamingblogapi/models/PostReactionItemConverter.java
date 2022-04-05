package cz.osu.gamingblogapi.models;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class PostReactionItemConverter  implements AttributeConverter<PostReactionItem, Integer> {
    @Override
    public Integer convertToDatabaseColumn(PostReactionItem attribute) {
        if (attribute == null)
            return null;

        return switch (attribute) {
            case LIKE -> 1;
            case DISLIKE -> 2;
            default -> throw new IllegalArgumentException(attribute + " not supported.");
        };
    }

    @Override
    public PostReactionItem convertToEntityAttribute(Integer dbData) {
        if (dbData == null)
            return null;

        return switch (dbData) {
            case 1 -> PostReactionItem.LIKE;
            case 2 -> PostReactionItem.DISLIKE;
            default -> throw new IllegalArgumentException(dbData + " not supported.");
        };
    }
}
