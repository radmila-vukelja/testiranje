package rs.tfzr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.tfzr.model.AppUser;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    AppUser findByUserName(String username);
}
