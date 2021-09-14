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

    public ClubRepository getClubRepository() {
        return this.clubRepository;
    }

    public ContenstantRepository getContestantRepository() {
        return this.contenstantRepository;
    }

    public Club getOne(Long id) {
        return getClubRepository().getOne(id);
    }

    public List<Club> getAll() {
        return getClubRepository().findAll();
    }

    public void delete(Long id) {
        Club club = getClubRepository().getOne(id);
        for (int i = 0; i < club.getContestantList().size(); i++) {
            club.getContestantList().get(i).setAddedToAClub(false);
            getContestantRepository().save(club.getContestantList().get(i));
        }
        club.setContestantList(null);
        getClubRepository().save(club);
        getClubRepository().deleteById(id);
    }

    public Club edit(Club club) {
        if (validateClubFieldsForEditing(club)) {
            return getClubRepository().save(club);
        }
        return null;
    }

    public boolean validateClubFieldsForEditing(Club club) {
        if (club.getId() == null || club.getName() == null || (club.getLocation() == null || club.getLocation().getName() == null) || club.getPictureURL() == null) {
            return false;
        }
        return true;
    }

    public void addContestantToAClub(Long clubId, Long contestantId) {
        Club club = this.getClubRepository().getOne(clubId);
        Contestant contestant = getContestantById(contestantId);
        if (!validateAge(contestant.getAge())) {
            return;
        }

        if (!validateJmbg(contestant.getJmbg())) {
            return;
        }

        if (checkIfContestantIsAlreadyAdded(contestant)) {
            return;
        }

        if (!validateName(contestant.getName())) {
            return;
        }

        if (!validateName(contestant.getLastName())) {
            return;
        }

        contestant.setAddedToAClub(true);
        club.getContestantList().add(contestant);
        getClubRepository().save(club);
    }

    public boolean checkIfContestantIsAlreadyAdded(Contestant contestant) {
        List<Club> clubList = this.getClubRepository().findAll();

        for (Club club : clubList) {
            for (Contestant contestantObject : club.getContestantList()) {
                if (contestantObject.getJmbg() == contestant.getJmbg()) {
                    return true;
                }
            }
        }
        return false;
    }

    public Contestant getContestantById(Long id) {
        return this.getContestantRepository().getOne(id);
    }

    public void removeContestantFromClub(Long clubId, Long contestantId) {
        Club club = this.getClubRepository().getOne(clubId);
        int index = getContestantIndexFromClub(contestantId, club);
        if (index != -1) {
            club.getContestantList().get(index).setAddedToAClub(false);
            club.getContestantList().remove(index);
            edit(club);
        }
    }

    public int getContestantIndexFromClub(Long contestantId, Club club) {
        for (int i = 0; i < club.getContestantList().size(); i++) {
            Contestant contestant = club.getContestantList().get(i);
            if (contestant.getId().equals(contestantId)) {
                return i;
            }
        }
        return -1;
    }

    public Club insert(Club club) {
        if (checkIfClubExists(club.getName())) {
            return getClubRepository().save(club);
        } else
            return null;
    }

    public boolean validateJmbg(Long jmbg) {
        int jmbgLength = String.valueOf(jmbg).length();
        if (jmbgLength == 13) {
            return true;
        }
        return false;
    }

    public boolean validateName(String name) {
        char[] chars = name.toCharArray();
        StringBuilder sb = new StringBuilder();
        for (char c : chars) {
            if (Character.isDigit(c)) {
                return false;
            }
        }
        return true;
    }

    public boolean checkIfClubExists(String clubName) {
        List<Club> clubList = getClubRepository().findAll();
        for (Club club : clubList) {
            if (club.getName().equals(clubName)) {
                return true;
            }
        }
        return false;
    }

    public boolean validateAge(int age) {
        if (age > 55 || age < 5) {
            return false;
        }
        return true;
    }
}
