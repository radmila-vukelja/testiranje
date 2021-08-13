package rs.tfzr.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "contestant")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Contestant {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private Integer age;

    @ManyToOne(cascade=CascadeType.ALL)
    private Location location;

    @Column(nullable = false)
    private Long jmbg;

    @ManyToOne(cascade=CascadeType.ALL)
    private WeightCategory weightCategory;

    @Column(nullable = false)
    private Boolean isAddedToAClub;

    public Contestant(){}

    public Contestant(Long id, String name, String lastName, Integer age, Location location, Long jmbg, WeightCategory weightCategory, Boolean isAddedToAClub) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.location = location;
        this.jmbg = jmbg;
        this.weightCategory = weightCategory;
        this.isAddedToAClub = isAddedToAClub;
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

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Long getJmbg() {
        return jmbg;
    }

    public void setJmbg(Long jmbg) {
        this.jmbg = jmbg;
    }

    public WeightCategory getWeightCategory() {
        return weightCategory;
    }

    public void setWeightCategory(WeightCategory weightCategory) {
        this.weightCategory = weightCategory;
    }

    public Boolean getAddedToAClub() {
        return isAddedToAClub;
    }

    public void setAddedToAClub(Boolean addedToAClub) {
        isAddedToAClub = addedToAClub;
    }

    @Override
    public String toString() {
        return "Contestant{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", lastName='" + lastName + '\'' +
                ", age=" + age +
                ", location=" + location +
                ", jmbg=" + jmbg +
                ", weightCategory=" + weightCategory +
                ", isAddedToAClub=" + isAddedToAClub +
                '}';
    }
}
