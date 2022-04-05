package cz.osu.gamingblogapi.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.stream.Stream;

public enum PostReactionItem {
    LIKE(1), DISLIKE(2);

    private final int value;

    private PostReactionItem(int value) {
        this.value = value;
    }

    @JsonValue
    public int getValue() {
        return value;
    }

    @JsonCreator
    static PostReactionItem fromValue(int value) {
        return Stream.of(PostReactionItem.values())
                .filter(postReactionItem -> postReactionItem.value == value)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unexpected PostReactionItem value: " + value));
    }
}
