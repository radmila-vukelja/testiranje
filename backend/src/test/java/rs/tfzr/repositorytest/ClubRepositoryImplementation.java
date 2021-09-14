package rs.tfzr.repositorytest;

import rs.tfzr.model.Club;
import rs.tfzr.model.Location;
import rs.tfzr.model.WeightCategory;
import rs.tfzr.utilstest.ClubMockedDataService;

import java.util.List;

public class ClubRepositoryImplementation {

    ClubMockedDataService clubMockedDataService;
    List<Club> clubList;
    List<Location> locations;
    List<WeightCategory> weightCategories;

    public ClubRepositoryImplementation() {
        this.clubMockedDataService = new ClubMockedDataService();
        this.locations = this.clubMockedDataService.populateMockedLocations();
        this.weightCategories = this.clubMockedDataService.populateMockedWeightCategories();
        this.clubList = this.clubMockedDataService.populateMockedClubs();
    }

    public List<Club> getAll() {
        return this.clubList;
    }

    public Club findOne(Long id) {
        Club club = getClubById(id);
        if (club != null) {
            return club;
        }
        return null;
    }

    public Club insert(Club club) {
        this.clubList.add(club);

        return club;
    }

    public Club getClubById(Long id) {
        for (Club club : clubList) {
            if (club.getId() == id) {
                return club;
            }
        }
        return null;
    }

    public int getClubIndexById(Long id) {
        for (int i = 0; i < clubList.size(); i++) {
            if (clubList.get(i).getId() == id) {
                return i;
            }
        }
        return -1;
    }

    public Club edit(Club club) {
        Club oldClub = getClubById(club.getId());
        if (oldClub != null) {
            oldClub.setLocation(club.getLocation());
            oldClub.setContestantList(club.getContestantList());
            oldClub.setPictureURL(club.getPictureURL());
            oldClub.setName(club.getName());
            return oldClub;
        }
        return null;
    }


    public void deleteById(Long id) {
        int index = getClubIndexById(id);
        if (index != -1) {
            clubList.remove(index);
        }
    }

}
