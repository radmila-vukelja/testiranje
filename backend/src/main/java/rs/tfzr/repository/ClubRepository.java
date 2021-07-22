package rs.tfzr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.tfzr.model.Club;

public interface ClubRepository extends JpaRepository<Club, Long> {
}
