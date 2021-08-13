package rs.tfzr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.tfzr.model.Club;
import rs.tfzr.model.Contestant;
import rs.tfzr.repository.ClubRepository;
import rs.tfzr.repository.ContenstantRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class ClubService {

    private ClubRepository clubRepository;
    private ContenstantRepository contenstantRepository;

    @Autowired
    public ClubService(
            ClubRepository clubRepository,
            ContenstantRepository contenstantRepository
    ) {
        this.clubRepository = clubRepository;
        this.contenstantRepository = contenstantRepository;
    }

    public Club getOne(Long id) {
        return clubRepository.getOne(id);
    }

    public List<Club> getAll() {
        return clubRepository.findAll();
    }

    public void delete(Long id) {
        clubRepository.deleteById(id);
    }

    public Club edit(Club club) {
        //do some logic.
        System.out.println("\n+\n+\n+");
        System.out.println(club.toString());
        System.out.println("\n+\n+\n+");
        return clubRepository.save(club);
    }

    public void addContestantToAClub(Long clubId, Long contestantId) {
        Club club = this.clubRepository.getOne(clubId);
        Contestant contestant = this.contenstantRepository.getOne(contestantId);
        contestant.setAddedToAClub(true);
        club.getContestantList().add(contestant);
        clubRepository.save(club);
    }

    public void removeContenstantFromClub(Long clubId, Long contestantId) {
        Club club = this.clubRepository.getOne(clubId);
        for (int i = 0; i < club.getContestantList().size(); i++) {
            Contestant contestant = club.getContestantList().get(i);
            contestant.setAddedToAClub(false);
            if (contestant.getId() == contestantId) {
                club.getContestantList().remove(i);
                break;
            }
        }
        edit(club);
    }

    public Club insert(Club club) {
        return clubRepository.save(club);
    }
}
