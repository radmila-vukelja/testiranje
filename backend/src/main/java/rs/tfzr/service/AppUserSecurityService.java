package rs.tfzr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import rs.tfzr.model.AppUser;
import rs.tfzr.model.Role;
import rs.tfzr.repository.AppUserRepository;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

@Transactional
@Service
public class AppUserSecurityService implements UserDetailsService {

    private AppUserRepository appUserRepository;

    @Autowired
    public AppUserSecurityService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            AppUser appUser = appUserRepository.findByUserName(username);
            if (appUser == null) {
                return null;
            }
            return new User(appUser.getUserName(), passwordEncoder().encode(appUser.getPassword()), getAuthorities(appUser));
        } catch (Exception e) {
            throw new UsernameNotFoundException("Korisnik nije nadjen.");
        }
    }

    private Set<GrantedAuthority> getAuthorities(AppUser appUser) {
        Set<GrantedAuthority> authorities = new HashSet<>();
        for (Role role : appUser.getRoles()) {
            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(role.getType().toString());
            authorities.add(grantedAuthority);
        }
        return authorities;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
