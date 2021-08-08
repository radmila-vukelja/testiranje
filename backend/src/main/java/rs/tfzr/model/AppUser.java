package rs.tfzr.model;

import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "user")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String password;

    @OneToMany
    @JoinTable(joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    public AppUser() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String korisnickoIme) {
        this.userName = korisnickoIme;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String sifra) {
        this.password = sifra;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getName() {
        return name;
    }

    public void setName(String ime) {
        this.name = ime;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String prezime) {
        this.lastName = prezime;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
