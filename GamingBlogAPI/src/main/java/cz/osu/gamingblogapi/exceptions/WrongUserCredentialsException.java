package cz.osu.gamingblogapi.exceptions;

public class WrongUserCredentialsException extends IllegalStateException {
    public WrongUserCredentialsException() {
        super("Wrong user credentials.");
    }
}
