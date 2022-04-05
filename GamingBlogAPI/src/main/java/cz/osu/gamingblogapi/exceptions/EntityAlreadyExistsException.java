package cz.osu.gamingblogapi.exceptions;

public class EntityAlreadyExistsException extends IllegalStateException {
    public EntityAlreadyExistsException() {
        super("The entity already exists.");
    }

    public EntityAlreadyExistsException(String entityName) {
        super("The entity '" + entityName +"' already exists.");
    }
}
