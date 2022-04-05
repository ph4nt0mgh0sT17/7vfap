package cz.osu.gamingblogapi.controllers;

import cz.osu.gamingblogapi.exceptions.FileAlreadyExistsException;
import cz.osu.gamingblogapi.services.interfaces.IImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/images")
@Secured(value = {"ROLE_ADMIN"})
public class ImageController {
    private final IImageService imageService;

    public ImageController(IImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file, @RequestParam("fileName") String fileName) {
        try {
            imageService.saveThumbnail(fileName, file);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("The image is successfully uploaded.");
        } catch (FileAlreadyExistsException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The file already exists.");
        } catch (IllegalStateException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Could not upload the image file.");
        }
    }

}
