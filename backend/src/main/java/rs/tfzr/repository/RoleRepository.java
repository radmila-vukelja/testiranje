package rs.tfzr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.tfzr.model.UserRole;

public interface RoleRepository extends JpaRepository<UserRole, Long> {
}
