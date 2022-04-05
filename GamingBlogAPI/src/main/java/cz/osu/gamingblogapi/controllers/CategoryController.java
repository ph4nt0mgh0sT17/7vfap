package cz.osu.gamingblogapi.controllers;

import cz.osu.gamingblogapi.requests.CreateCategoryRequest;
import cz.osu.gamingblogapi.services.interfaces.ICategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/category")
@Slf4j
public class CategoryController {
    private final ICategoryService _categoryService;

    public CategoryController(ICategoryService categoryService) {
        _categoryService = categoryService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllCategories() {
        log.info("GET /api/category");
        var categories = _categoryService.retrieveAll();

        return ResponseEntity.ok(categories);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> createCategory(@RequestBody CreateCategoryRequest createCategoryRequest) {
        try {
            _categoryService.create(createCategoryRequest);
            return ResponseEntity.accepted().body("Category created.");
        } catch (IllegalStateException ignored) {
            return ResponseEntity.badRequest().body("Could not create category.");
        }
    }
}
