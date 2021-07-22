package rs.tfzr.model;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "age_category")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class AgeCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;
}