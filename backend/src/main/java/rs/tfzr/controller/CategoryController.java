package rs.tfzr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rs.tfzr.model.WeightCategory;
import rs.tfzr.service.CategoryService;

@RestController
@RequestMapping("/category")
@CrossOrigin
public class CategoryController {

    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity getOne(@PathVariable("id") Long id) {
        return new ResponseEntity(this.categoryService.getOne(id), HttpStatus.OK);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity getAll() {
        return new ResponseEntity(this.categoryService.getAll(), HttpStatus.OK);
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity edit(@RequestBody WeightCategory weightCategory) {
        return new ResponseEntity(categoryService.edit(weightCategory), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity save(@RequestBody WeightCategory weightCategory) {
        return new ResponseEntity(this.categoryService.insert(weightCategory), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity delete(@PathVariable("id") Long id) {
        this.categoryService.delete(id);
        return new ResponseEntity(this.categoryService.getAll(), HttpStatus.OK);
    }
}