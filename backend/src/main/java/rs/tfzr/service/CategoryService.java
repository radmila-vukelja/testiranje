package rs.tfzr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.tfzr.model.WeightCategory;
import javax.transaction.Transactional;
import java.util.List;
import rs.tfzr.repository.CategoryRepository;


@Transactional
@Service
public class CategoryService {

    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public WeightCategory getOne(Long id) {
        return categoryRepository.getOne(id);
    }

    public List<WeightCategory> getAll() {
        return categoryRepository.findAll();
    }

    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }

    public WeightCategory edit(WeightCategory weightCategory) {
        //do some logic.
        return categoryRepository.save(weightCategory);
    }

    public WeightCategory insert(WeightCategory weightCategory) {
        return categoryRepository.save(weightCategory);
    }
}
