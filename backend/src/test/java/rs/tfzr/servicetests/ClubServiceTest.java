package rs.tfzr.servicetests;

import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import rs.tfzr.model.Club;
import rs.tfzr.model.Contestant;
import rs.tfzr.model.Location;
import rs.tfzr.model.WeightCategory;
import rs.tfzr.repository.ClubRepository;
import rs.tfzr.repository.ContenstantRepository;
import rs.tfzr.repositorytest.ClubRepositoryImplementation;
import rs.tfzr.service.ClubService;

import java.util.ArrayList;
import java.util.List;

public class ClubServiceTest {

    private ClubService clubService;
    private ClubRepositoryImplementation clubRepositoryImplementation;

    public ClubServiceTest() {
        this.clubRepositoryImplementation = new ClubRepositoryImplementation();
        mockClubService();
    }

    public void mockClubService() {
        ClubRepository clubRepository = mock(ClubRepository.class);
        ContenstantRepository contestantRepository = mock(ContenstantRepository.class);
        clubService = new ClubService(clubRepository, contestantRepository);
        when(clubService.getAll()).thenReturn(clubRepositoryImplementation.getAll());
    }

    @Test //test broj 1
    public void addedClubShouldHaveSamePropertiesAsPassedClub() {
        System.out.println("test addedClubShouldHaveSamePropertiesAsPassedClub se pokrece");
        List<Contestant> contestantList = new ArrayList<>();
        Location location = new Location(1L, "Beograd");
        WeightCategory weightCategory = new WeightCategory(4L, 68.0, "muski", "24");

        Contestant contestant = new Contestant(1L, "igrac 1 ime", "igrac 1 prezime", 22, location, 123321123312L, weightCategory, false);
        contestantList.add(contestant);
        Club club = new Club(33L, "Obrenovac", location, "picture_URL3", contestantList);

        List<Club> clubList = clubService.getAll();

        assert (clubList.size() == 4);
        when(clubService.insert(club)).thenReturn(clubRepositoryImplementation.insert(club));
        assert (clubList.size() == 5);
        assert (clubList.get(4) != null);

        assert (clubList.get(clubList.size() - 1).getId() == club.getId());
        System.out.println("test addedClubShouldHaveSamePropertiesAsPassedClub se zavrsio");
    }

    @Test //test broj 2
    public void validateJmbgShouldReturnTrue() {
        System.out.println("test validateJmbgShouldReturnTrue se pokrece");
        //jmbg as 13 brojeva
        Long jmbg = 1234567891234L;
        boolean result = clubService.validateJmbg(jmbg);
        assert (result);
        System.out.println("test validateJmbgShouldReturnTrue se zavrsio");
    }

    @Test //test broj 3
    public void validateJmbgShouldReturnFalse() {
        System.out.println("test validateJmbgShouldReturnFalse se pokrece");
        //jmbg as 14 brojeva
        Long jmbg1 = 12345678912345L;
        boolean result1 = clubService.validateJmbg(jmbg1);
        assert (!result1);

        //jmbg as 12 brojeva
        Long jmbg2 = 123456789123L;
        boolean result2 = clubService.validateJmbg(jmbg2);
        assert (!result2);
        System.out.println("test validateJmbgShouldReturnFalse se zavrsio");
    }

    @Test //test broj 4
    public void validateNameShouldReturnTrue() {
        System.out.println("test validateNameShouldReturnTrue se pokrece");
        String name = "Nekoime";
        boolean result = clubService.validateName(name);
        assert (result);
        System.out.println("test validateNameShouldReturnTrue se zavrsio");
    }

    @Test //test broj 5
    public void validateNameShouldReturnFalse() {
        System.out.println("test validateNameShouldReturnFalse se pokrece");
        String name = "Nek2oime";
        boolean result = clubService.validateName(name);
        assert (!result);
        System.out.println("test validateNameShouldReturnFalse se zavrsio");
    }

    @Test //test broj 6
    public void clubShouldNotBeAddedBecauseClubWithThatNameAlreadyExists() {
        System.out.println("test clubShouldNotBeAddedBecauseClubWithThatNameAlreadyExists se pokrece");
        when(clubService.getClubRepository().findAll()).thenReturn(clubRepositoryImplementation.getAll());
        Club club = new Club(12L, "FK RAD", new Location(), "PICTURE_URL", new ArrayList<>());
        boolean clubExists = clubService.checkIfClubExists(club.getName());
        assert (clubExists == false);
        System.out.println("test clubShouldNotBeAddedBecauseClubWithThatNameAlreadyExists se zavrsio");
    }


    @Test //test broj 7
    public void clubShouldBeAddedBecauseClubWithThatNameDoesntExist() {
        System.out.println("test clubShouldBeAddedBecauseClubWithThatNameDoesntExist se pokrece");
        when(clubService.getClubRepository().findAll()).thenReturn(clubRepositoryImplementation.getAll());
        Club club = new Club(12L, "Partizan", new Location(), "PICTURE_URL", new ArrayList<>());
        boolean clubExists = clubService.checkIfClubExists(club.getName());
        assert (clubExists == true);
        System.out.println("test clubShouldBeAddedBecauseClubWithThatNameDoesntExist se zavrsio");
    }

    @Test //test broj 8
    public void contestantShouldBeAlreadyAdded(){
        System.out.println("test contestantShouldBeAlreadyAdded se pokrece");
        when(clubService.getClubRepository().findAll()).thenReturn(clubRepositoryImplementation.getAll());
        List<Club> clubList = clubService.getClubRepository().findAll();
        //uzecemo nasumicnog igraca da proverimo da li se vec nalazi
        Contestant contestant = clubList.get(1).getContestantList().get(1);
        boolean contestantExists = clubService.checkIfContestantIsAlreadyAdded(contestant);
        assert (contestantExists == true);
        System.out.println("test contestantShouldBeAlreadyAdded se zavrsio");
    }

    @Test //test broj 9
    public void contestantShouldNotBeAlreadyAdded(){
        System.out.println("test contestantShouldNotBeAlreadyAdded se pokrece");
        when(clubService.getClubRepository().findAll()).thenReturn(clubRepositoryImplementation.getAll());
        List<Club> clubList = clubService.getClubRepository().findAll();
        //napravicemo novog igraca da proverimo da li se vec nalazi
        Contestant contestant = new Contestant(6321L, "ime igraca 99", "prezime igraca 99", 26, new Location(), 123456789012L, new WeightCategory(), false);
        boolean contestantExists = clubService.checkIfContestantIsAlreadyAdded(contestant);
        assert (contestantExists == false);
        System.out.println("test contestantShouldNotBeAlreadyAdded se zavrsio");
    }

    @Test // test broj 10
    public void clubShouldPassValidationBeforeEditing(){
        System.out.println("test clubShouldPassValidationBeforeEditing se pokrece");
        Location location = new Location(1L, "Beograd");
        Club club = new Club(33L, "Obrenovac", location, "picture_URL3", null);
        boolean clubFieldsAreValidated = clubService.validateClubFieldsForEditing(club);
        assert(clubFieldsAreValidated == true);
        System.out.println("test clubShouldPassValidationBeforeEditing se zavrsio");
    }

    @Test // test broj 11
    public void clubShouldNotPassValidationBeforeEditing(){
        System.out.println("test clubShouldNotPassValidationBeforeEditing se pokrece");
        Club club = new Club(12L, "FK RAD", new Location(), "PICTURE_URL", new ArrayList<>());
        boolean clubFieldsAreValidated = clubService.validateClubFieldsForEditing(club);
        assert(clubFieldsAreValidated == false);
        System.out.println("test clubShouldNotPassValidationBeforeEditing se zavrsio");
    }

}
