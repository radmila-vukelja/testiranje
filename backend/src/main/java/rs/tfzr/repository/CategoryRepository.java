package rs.tfzr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.tfzr.model.WeightCategory;

public interface CategoryRepository extends JpaRepository<WeightCategory, Long> {
}
