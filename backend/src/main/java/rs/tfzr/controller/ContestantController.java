package rs.tfzr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rs.tfzr.model.Club;
import rs.tfzr.model.Contestant;
import rs.tfzr.service.ContestantService;

@RestController
@RequestMapping("/contestant")
@CrossOrigin
public class ContestantController {

    private ContestantService contestantService;

    @Autowired
    public ContestantController(ContestantService contestantService) {
        this.contestantService = contestantService;
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity getOne(@PathVariable("id") Long id) {
        return new ResponseEntity(this.contestantService.getOne(id), HttpStatus.OK);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity getAll() {
        return new ResponseEntity(this.contestantService.getAll(), HttpStatus.OK);
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity edit(@RequestBody Contestant contestant) {
        return new ResponseEntity(contestantService.edit(contestant), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity save(@RequestBody Contestant contenstant) {
        System.out.println("\n\n\n\n\n\n\n\n\n\n");
        System.out.println(contenstant.toString());
        return new ResponseEntity(this.contestantService.insert(contenstant), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity delete(@PathVariable("id") Long id) {
        this.contestantService.delete(id);
        return new ResponseEntity(this.contestantService.getAll(), HttpStatus.OK);
    }
}