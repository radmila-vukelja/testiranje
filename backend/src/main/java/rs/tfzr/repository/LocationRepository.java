package rs.tfzr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.tfzr.model.Location;

public interface LocationRepository extends JpaRepository<Location, Long> {

    Location findByName(String name);
}

