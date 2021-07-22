package rs.tfzr.controller.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rs.tfzr.model.AppUser;
import rs.tfzr.model.AuthenticatedAppUser;
import rs.tfzr.repository.AppUserRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class LoginController {

    private AppUserRepository appUserRepository;

    @Autowired
    public LoginController(AppUserRepository korisnik) {
        this.appUserRepository = korisnik;
    }

    @RequestMapping("/user")
    public AuthenticatedAppUser getUser(Authentication authentication) {
        System.out.println("login");
        List<String> roles = new ArrayList<>();
        for (GrantedAuthority authority : authentication.getAuthorities()) {
            roles.add(authority.getAuthority());
        }

        AppUser trenutniAppUser = appUserRepository.findByUserName(authentication.getName());

        AuthenticatedAppUser korisnik = new AuthenticatedAppUser(
                trenutniAppUser.getId(), authentication.getName(), roles);
        return korisnik;
    }

}
