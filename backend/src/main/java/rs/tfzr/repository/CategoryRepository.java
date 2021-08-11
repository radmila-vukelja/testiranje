package rs.tfzr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import rs.tfzr.model.WeightCategory;

import java.util.List;

public interface CategoryRepository extends JpaRepository<WeightCategory, Long> {


    @Query(value = "SELECT DISTINCT w.category FROM weight_category w", nativeQuery = true)
    List<String> findDistinctCategories();

    List<WeightCategory> findAllByGenderAndCategory(String gender, String category);

    WeightCategory findByGenderAndCategoryAndWeight(String gender, String category, Double weight);
}
