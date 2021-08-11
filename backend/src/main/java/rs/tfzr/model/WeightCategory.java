package rs.tfzr.model;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "weight_category")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class WeightCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private Double weight;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private String category;

    public WeightCategory() {}

    public WeightCategory(Long id, Double weight, String gender, String ageCategory) {
        this.id = id;
        this.weight = weight;
        this.gender = gender;
        this.category = ageCategory;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "WeightCategory{" +
                "id=" + id +
                ", weight=" + weight +
                ", gender='" + gender + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}
