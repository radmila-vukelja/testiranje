package rs.tfzr.utilstest;

import rs.tfzr.model.Club;
import rs.tfzr.model.Contestant;
import rs.tfzr.model.Location;
import rs.tfzr.model.WeightCategory;

import java.util.ArrayList;
import java.util.List;

public class ClubMockedDataService {


    List<Club> clubList = new ArrayList<>();
    List<Location> locations = new ArrayList<>();
    List<WeightCategory> weightCategories = new ArrayList<>();

    public ClubMockedDataService(){
        this.populateMockedLocations();
        this.populateMockedWeightCategories();
        this.populateMockedContestants();
        this.populateMockedContestants();
    }

    public List<Club> populateMockedClubs() {
        Club club = new Club(1L, "Partizan", locations.get(0), "picture_URL1", this.populateMockedContestants());
        Club club1 = new Club(2L, "Crvena Zvezda", locations.get(1), "picture_URL2", this.populateMockedContestants1());
        Club club2 = new Club(3L, "Obrenovac", locations.get(2), "picture_URL3", this.populateMockedContestants2());
        Club club3 = new Club(4L, "FK Obilic", locations.get(2), "picture_URL3", this.populateMockedContestants3());
        this.clubList.add(club);
        this.clubList.add(club1);
        this.clubList.add(club2);
        this.clubList.add(club3);
        return clubList;
    }

    public List<WeightCategory> populateMockedWeightCategories() {
        WeightCategory weightCategory = new WeightCategory(1L, 54.0, "muski", "24");
        WeightCategory weightCategory1 = new WeightCategory(2L, 59.0, "muski", "24");
        WeightCategory weightCategory2 = new WeightCategory(3L, 64.0, "muski", "24");
        WeightCategory weightCategory3 = new WeightCategory(4L, 69.0, "muski", "24");
        weightCategories.add(weightCategory);
        weightCategories.add(weightCategory1);
        weightCategories.add(weightCategory2);
        weightCategories.add(weightCategory3);
        return weightCategories;
    }

    public List<Contestant> populateMockedContestants() {
        Contestant contestant1 = new Contestant(1L, "igrac 1 ime", "igrac 1 prezime", 22, locations.get(0), 123321123312L, weightCategories.get(0), true);
        Contestant contestant2 = new Contestant(2L, "igrac 2 ime", "igrac 2 prezime", 24, locations.get(0), 123334623412L, weightCategories.get(1), true);
        Contestant contestant3 = new Contestant(3L, "igrac 3 ime", "igrac 3 prezime", 25, locations.get(0), 123345725432L, weightCategories.get(2), true);
        Contestant contestant4 = new Contestant(4L, "igrac 4 ime", "igrac 4 prezime", 26, locations.get(0), 123345634512L, weightCategories.get(3), true);
        List<Contestant> contestantList = new ArrayList<>();
        contestantList.add(contestant1);
        contestantList.add(contestant2);
        contestantList.add(contestant3);
        contestantList.add(contestant4);
        return contestantList;
    }

    public List<Contestant> populateMockedContestants1() {
        Contestant contestant1 = new Contestant(1L, "igrac 5 ime", "igrac 5 prezime", 22, locations.get(0), 122351123312L, weightCategories.get(0), true);
        Contestant contestant2 = new Contestant(2L, "igrac 6 ime", "igrac 6 prezime", 24, locations.get(0), 123332653412L, weightCategories.get(1), true);
        Contestant contestant3 = new Contestant(3L, "igrac 6 ime", "igrac 7 prezime", 25, locations.get(0), 123345125632L, weightCategories.get(2), true);
        Contestant contestant4 = new Contestant(4L, "igrac 7 ime", "igrac 8 prezime", 26, locations.get(0), 123365634512L, weightCategories.get(3), true);
        List<Contestant> contestantList = new ArrayList<>();
        contestantList.add(contestant1);
        contestantList.add(contestant2);
        contestantList.add(contestant3);
        contestantList.add(contestant4);
        return contestantList;
    }

    public List<Contestant> populateMockedContestants2() {
        Contestant contestant1 = new Contestant(1L, "igrac 8 ime", "igrac 8 prezime", 22, locations.get(0), 423321123312L, weightCategories.get(0), true);
        Contestant contestant2 = new Contestant(2L, "igrac 9 ime", "igrac 9 prezime", 24, locations.get(0), 523334623412L, weightCategories.get(1), true);
        Contestant contestant3 = new Contestant(3L, "igrac 10 ime", "igrac 10 prezime", 25, locations.get(0), 623345725432L, weightCategories.get(2), true);
        Contestant contestant4 = new Contestant(4L, "igrac 11 ime", "igrac 11 prezime", 26, locations.get(0), 723345634512L, weightCategories.get(3), true);
        List<Contestant> contestantList = new ArrayList<>();
        contestantList.add(contestant1);
        contestantList.add(contestant2);
        contestantList.add(contestant3);
        contestantList.add(contestant4);
        return contestantList;
    }

    public List<Contestant> populateMockedContestants3() {
        Contestant contestant1 = new Contestant(1L, "igrac 12 ime", "igrac 12 prezime", 22, locations.get(0), 121212112332L, weightCategories.get(0), true);
        Contestant contestant2 = new Contestant(2L, "igrac 13 ime", "igrac 13 prezime", 24, locations.get(0), 133313621312L, weightCategories.get(1), true);
        Contestant contestant3 = new Contestant(3L, "igrac 14 ime", "igrac 14 prezime", 25, locations.get(0), 147341421140L, weightCategories.get(2), true);
        Contestant contestant4 = new Contestant(4L, "igrac 15 ime", "igrac 15 prezime", 26, locations.get(0), 153315531552L, weightCategories.get(3), true);
        List<Contestant> contestantList = new ArrayList<>();
        contestantList.add(contestant1);
        contestantList.add(contestant2);
        contestantList.add(contestant3);
        contestantList.add(contestant4);
        return contestantList;
    }

    public List<Location> populateMockedLocations() {
        Location beograd = new Location(1L, "Beograd");
        Location zrenjanin = new Location(2L, "Zrenjanin");
        Location noviSad = new Location(3L, "Novi Sad");
        Location kragujevac = new Location(4L, "Kragujevac");
        Location smederevo = new Location(5L, "Smederevo");
        Location pancevo = new Location(5L, "Pancevo");

        locations.add(beograd);
        locations.add(zrenjanin);
        locations.add(noviSad);
        locations.add(kragujevac);
        locations.add(smederevo);
        locations.add(pancevo);
        return locations;
    }
}
