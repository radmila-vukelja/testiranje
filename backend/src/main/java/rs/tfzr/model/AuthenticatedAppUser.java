package rs.tfzr.model;

import java.util.List;

public class AuthenticatedAppUser {

    private Long id;
    private String username;
    private List<String> roles;

    public AuthenticatedAppUser() {
    }

    public AuthenticatedAppUser(Long id, String username, List<String> roles) {
        this.id = id;
        this.username = username;
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
