package cz.osu.gamingblogapi.services.interfaces;

import cz.osu.gamingblogapi.exceptions.FileAlreadyExistsException;
import org.springframework.web.multipart.MultipartFile;

public interface IImageService {
    /**
     * Saves the given thumbnail as {@code imageFile} in the file system.
     *
     * @param imageName The name of the image to be saved.
     * @param imageFile The file of the image to be saved.
     * @throws FileAlreadyExistsException when the file with given name already exists.
     * @throws IllegalStateException      when the file cannot be somehow saved.
     */
    void saveThumbnail(String imageName, MultipartFile imageFile);
}
