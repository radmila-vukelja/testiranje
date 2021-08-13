package rs.tfzr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rs.tfzr.model.Club;
import rs.tfzr.service.ClubService;

@RestController
@RequestMapping("/club")
@CrossOrigin
public class ClubController {

    private ClubService clubService;

    @Autowired
    public ClubController(ClubService clubService) {
        this.clubService = clubService;
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity getOne(@PathVariable("id") Long id) {
        return new ResponseEntity(this.clubService.getOne(id), HttpStatus.OK);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity getAll() {
        return new ResponseEntity(this.clubService.getAll(), HttpStatus.OK);
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity edit(@RequestBody Club club) {
        return new ResponseEntity(clubService.edit(club), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity save(@RequestBody Club club) {
        return new ResponseEntity(this.clubService.insert(club), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity delete(@PathVariable("id") Long id) {
        this.clubService.delete(id);
        return new ResponseEntity(this.clubService.getAll(), HttpStatus.OK);
    }

    @DeleteMapping("/{clubId}/{contestantId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity removeContenstantFromClub(@PathVariable("clubId") Long clubId, @PathVariable("contestantId") Long contestantId) {
        this.clubService.removeContenstantFromClub(clubId, contestantId);
        return new ResponseEntity(this.clubService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/add-contestant/{clubId}/{contestantId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity addContestantToAClub(@PathVariable("clubId") Long clubId, @PathVariable("contestantId") Long contestantId) {
        this.clubService.addContestantToAClub(clubId, contestantId);
        return new ResponseEntity(this.clubService.getAll(), HttpStatus.OK);
    }
}