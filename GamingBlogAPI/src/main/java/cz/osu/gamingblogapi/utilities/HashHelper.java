package cz.osu.gamingblogapi.utilities;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class HashHelper {

    /**
     * Hashes the given {@code password} into SHA-512 hash.
     *
     * @param password The password to be hashed.
     * @return The SHA-512 hash of the given {@code password}.
     * @throws RuntimeException when the password cannot be hashed.
     * @implNote The {@link RuntimeException} should not be thrown in the production as it is not descriptive enough
     * to deduce what is wrong.
     */
    public static String hashPassword(String password) {
        try {
            var sha512 = MessageDigest.getInstance("SHA-512");
            var messageDigest = sha512.digest(password.getBytes());
            var bigInteger = new BigInteger(1, messageDigest);
            var hashText = new StringBuilder(bigInteger.toString(16));

            while (hashText.length() < 32) {
                hashText.insert(0, "0");
            }

            return hashText.toString();
        } catch (NoSuchAlgorithmException ex) {
            throw new RuntimeException();
        }
    }
}
