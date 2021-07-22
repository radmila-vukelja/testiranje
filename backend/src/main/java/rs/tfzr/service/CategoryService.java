package rs.tfzr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.tfzr.model.Category;
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

    public Category getOne(Long id) {
        return categoryRepository.getOne(id);
    }

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }

    public Category edit(Category category) {
        //do some logic.
        return categoryRepository.save(category);
    }

    public Category insert(Category category) {
        return categoryRepository.save(category);
    }
}
