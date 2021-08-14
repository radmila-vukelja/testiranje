package rs.tfzr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.tfzr.model.Club;
import rs.tfzr.model.Contestant;

public interface ClubRepository extends JpaRepository<Club, Long> {

    Club findClubByContestantListIsContaining(Contestant contestant);
}
