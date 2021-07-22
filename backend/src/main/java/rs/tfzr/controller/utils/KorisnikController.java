package rs.tfzr.controller.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rs.tfzr.model.AppUser;
import rs.tfzr.service.AppUserService;

import java.util.List;

@RestController
@RequestMapping("/korisnik")
@CrossOrigin
public class KorisnikController {

    private AppUserService appUserService;

    @Autowired
    public KorisnikController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping
    public List<AppUser> findAll() {
        return appUserService.findAll();
    }

    @PostMapping("/registruj-se")
    public ResponseEntity registrujSe(@RequestBody AppUser appUser) {
        System.out.println("korisnik: " + appUser.getName() + " " + appUser.getUserName() + " " + appUser.getLastName() + " " + appUser.getPassword());
        return new ResponseEntity(appUserService.registrujSe(appUser), HttpStatus.OK);
    }

}
