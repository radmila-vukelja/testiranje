package rs.tfzr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.tfzr.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
