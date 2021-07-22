package rs.tfzr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.tfzr.model.AgeCategory;

public interface AgeCategoryRepository extends JpaRepository<AgeCategory, Long> {
}
