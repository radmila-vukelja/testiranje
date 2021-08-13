package rs.tfzr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.tfzr.model.Contestant;

import java.util.List;

public interface ContenstantRepository extends JpaRepository<Contestant, Long> {

    List<Contestant> findAllByIsAddedToAClub(Boolean added);
}

