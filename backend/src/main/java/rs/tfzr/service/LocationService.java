package rs.tfzr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.tfzr.model.Location;
import rs.tfzr.repository.LocationRepository;

import javax.transaction.Transactional;
import java.util.Comparator;
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
        Location location = locationRepository.getOne(id);
        if (location != null) {
            return location;
        } else {
            return null;
        }
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

    public Location findByName(String name) {
        Location location = this.locationRepository.findByName(name);
        if (location != null) {
            return location;
        } else {
            return null;
        }
    }

    public List<Location> deleteByName(String name) {
        Location location = this.findByName(name);
        if (location != null) {
            locationRepository.deleteById(location.getId());
        }
        return locationRepository.findAll();
    }

}
