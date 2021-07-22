package rs.tfzr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.tfzr.model.AgeCategory;
import rs.tfzr.repository.AgeCategoryRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class AgeCategoryService {

    private AgeCategoryRepository ageCategoryRepository;

    @Autowired
    public AgeCategoryService(AgeCategoryRepository ageCategoryRepository) {
        this.ageCategoryRepository = ageCategoryRepository;
    }

    public AgeCategory getOne(Long id) {
        return ageCategoryRepository.getOne(id);
    }

    public List<AgeCategory> getAll() {
        return ageCategoryRepository.findAll();
    }

    public void delete(Long id) {
        ageCategoryRepository.deleteById(id);
    }

    public AgeCategory edit(AgeCategory ageCategory) {
        //do some logic.
        return ageCategoryRepository.save(ageCategory);
    }

    public AgeCategory insert(AgeCategory ageCategory) {
        return ageCategoryRepository.save(ageCategory);
    }
}
