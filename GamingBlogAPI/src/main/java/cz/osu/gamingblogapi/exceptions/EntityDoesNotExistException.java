package cz.osu.gamingblogapi.exceptions;

public class EntityDoesNotExistException extends IllegalStateException {
    public EntityDoesNotExistException() {
        super("The entity does not exist.");
    }

    public EntityDoesNotExistException(String entityName) {
        super("The entity '" + entityName +"' does not exist.");
    }
}
