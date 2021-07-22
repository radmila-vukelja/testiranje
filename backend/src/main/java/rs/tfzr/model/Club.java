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

    @ManyToOne
    private Location location;

    @OneToMany
    private List<Contestant> contestantList;

    public Club() {
    }

    public Club(Long id, String name, Location location, List<Contestant> contestantList) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.contestantList = contestantList;
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
}
