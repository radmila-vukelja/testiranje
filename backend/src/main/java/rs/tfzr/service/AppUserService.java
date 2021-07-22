package rs.tfzr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import rs.tfzr.model.AppUser;
import rs.tfzr.model.UserRole;
import rs.tfzr.repository.AppUserRepository;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Transactional
@Service
public class AppUserService {

    private AppUserRepository appUserRepository;

    @Autowired
    public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public UserDetails loadUserByUsername(String korisnickoIme) throws UsernameNotFoundException {
        try {
            AppUser appUser = appUserRepository.findByUserName(korisnickoIme);
            if (appUser == null) {
                return null;
            }
            return new User(appUser.getUserName(), appUser.getPassword(), getAuthorities(appUser));
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found");
        }
    }

    private Set<GrantedAuthority> getAuthorities(AppUser appUser) {
        Set<GrantedAuthority> authorities = new HashSet<>();
        for (UserRole userRole : appUser.getRoles()) {
            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(userRole.getType().toString());
            authorities.add(grantedAuthority);
        }
        return authorities;
    }

    public List<AppUser> findAll() {
        return appUserRepository.findAll();
    }

    public AppUser registrujSe(AppUser appUser) {
        return appUserRepository.save(appUser);
    }

}
