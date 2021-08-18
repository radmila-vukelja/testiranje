package rs.tfzr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.tfzr.model.Location;
import rs.tfzr.repository.LocationRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class LocationService {

    private LocationRepository locationRepository;

    @Autowired
    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public Location getOne(Long id) {
        return locationRepository.getOne(id);
    }

    public List<Location> getAll() {
        return locationRepository.findAll();
    }

    public void delete(Long id) {
        locationRepository.deleteById(id);
    }

    public Location edit(Location location) {
        return locationRepository.save(location);
    }

    public Location insert(Location location) {
        return locationRepository.save(location);
    }

    public Location findByName(String name){
        return this.locationRepository.findByName(name);
    }
}
