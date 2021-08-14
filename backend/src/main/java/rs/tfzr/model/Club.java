package rs.tfzr.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "club")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Club {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String pictureURL;

    @ManyToOne
    private Location location;

    @OneToMany(cascade=CascadeType.ALL)
    private List<Contestant> contestantList;

    public Club() {
    }

    public Club(Long id, String name, Location location, String pictureURL, List<Contestant> contestantList) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.contestantList = contestantList;
        this.pictureURL = pictureURL;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPictureURL() {
        return pictureURL;
    }

    public void setPictureURL(String pictureURL) {
        this.pictureURL = pictureURL;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<Contestant> getContestantList() {
        return contestantList;
    }

    public void setContestantList(List<Contestant> contestantList) {
        this.contestantList = contestantList;
    }

    @Override
    public String toString() {
        return "Club{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", pictureURL='" + pictureURL + '\'' +
                ", location=" + location +
                ", contestantList=" + contestantList +
                '}';
    }
}
