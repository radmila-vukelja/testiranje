package rs.tfzr.model;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "category")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private Double weight;

    @ManyToOne
    private AgeCategory ageCategory;

    public Category() {}

    public Category(Long id, Double weight, AgeCategory ageCategory) {
        this.id = id;
        this.weight = weight;
        this.ageCategory = ageCategory;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public AgeCategory getAgeCategory() {
        return ageCategory;
    }

    public void setAgeCategory(AgeCategory ageCategory) {
        this.ageCategory = ageCategory;
    }
}
