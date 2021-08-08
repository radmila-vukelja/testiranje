package rs.tfzr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.tfzr.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
