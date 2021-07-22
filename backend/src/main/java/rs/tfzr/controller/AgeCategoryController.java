package rs.tfzr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rs.tfzr.model.AgeCategory;
import rs.tfzr.service.AgeCategoryService;

@RestController
@RequestMapping("/age-category")
@CrossOrigin
public class AgeCategoryController {

    private AgeCategoryService ageCategoryService;

    @Autowired
    public AgeCategoryController(AgeCategoryService ageCategoryService) {
        this.ageCategoryService = ageCategoryService;
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity getOne(@PathVariable("id") Long id) {
        return new ResponseEntity(this.ageCategoryService.getOne(id), HttpStatus.OK);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity getAll() {
        return new ResponseEntity(this.ageCategoryService.getAll(), HttpStatus.OK);
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity edit(@RequestBody AgeCategory ageCategory) {
        return new ResponseEntity(ageCategoryService.edit(ageCategory), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity save(@RequestBody AgeCategory ageCategory) {
        return new ResponseEntity(this.ageCategoryService.insert(ageCategory), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity delete(@PathVariable("id") Long id) {
        this.ageCategoryService.delete(id);
        return new ResponseEntity(this.ageCategoryService.getAll(), HttpStatus.OK);
    }
//
//    @GetMapping("/daj-narudzbine/{id}")
//    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
//    public ResponseEntity dajNarudzbinePoIdKorisnika(@PathVariable("id") Long id) {
//        return new ResponseEntity(this.narudzbinaService.dajNarudzbinePoIdKorisnika(id), HttpStatus.OK);
//    }

}
