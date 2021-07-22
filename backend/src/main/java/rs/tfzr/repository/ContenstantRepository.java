package rs.tfzr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.tfzr.model.Contestant;

public interface ContenstantRepository extends JpaRepository<Contestant, Long> {
}

