package rs.tfzr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.tfzr.model.Contestant;
import rs.tfzr.model.WeightCategory;
import rs.tfzr.repository.CategoryRepository;
import rs.tfzr.repository.ContenstantRepository;
import rs.tfzr.repository.LocationRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class ContestantService {

    private ContenstantRepository contenstantRepository;
    private LocationRepository locationRepository;
    private CategoryRepository categoryRepository;

    @Autowired
    public ContestantService(ContenstantRepository contenstantRepository, LocationRepository locationRepository, CategoryRepository categoryRepository) {
        this.contenstantRepository = contenstantRepository;
        this.locationRepository = locationRepository;
        this.categoryRepository = categoryRepository;
    }

    public Contestant getOne(Long id) {
        return contenstantRepository.getOne(id);
    }

    public List<Contestant> getAll() {
        return contenstantRepository.findAll();
    }

    public void delete(Long id) {
        contenstantRepository.deleteById(id);
    }

    public Contestant edit(Contestant contestant) {
        //do some logic.

        return contenstantRepository.save(contestant);
    }

    public Contestant insert(Contestant contestant) {
        contestant.setLocation(
                this.locationRepository.findByName(contestant.getLocation().getName())
        );

        WeightCategory weightCategory = this.categoryRepository.findByGenderAndCategoryAndWeight(
                contestant.getWeightCategory().getGender(),
                contestant.getWeightCategory().getCategory(),
                contestant.getWeightCategory().getWeight()
        );

        System.out.println("\n\n\n\n\n\n\n");
        System.out.println("weightCategory::::");
        System.out.println( weightCategory.toString());
        contestant.setWeightCategory(
                weightCategory
        );

        System.out.println(contestant.toString());
        return contenstantRepository.save(contestant);
    }
}
