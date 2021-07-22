package rs.tfzr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.tfzr.model.Contestant;
import rs.tfzr.repository.ContenstantRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class ContestantService {

    private ContenstantRepository contenstantRepository;

    @Autowired
    public ContestantService(ContenstantRepository contenstantRepository) {
        this.contenstantRepository = contenstantRepository;
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
        return contenstantRepository.save(contestant);
    }
}
