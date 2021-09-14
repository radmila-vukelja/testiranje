package rs.tfzr.controllertest;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;
import rs.tfzr.SeminarskiApplication;

import rs.tfzr.model.Location;

import static org.junit.jupiter.api.Assertions.fail;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeminarskiApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class LocationControllerIT {

    @LocalServerPort
    private int port;

    @Test //test 1
    public void shouldReturnAllLocations() {
        String locationApiUrl = "http://localhost:" + port + "/location/all";

        HttpHeaders headers = getAuthenticationHeaders();
        HttpEntity<Location[]> entity = new HttpEntity<>(null, headers);
        TestRestTemplate restTemplate = new TestRestTemplate();
        try {
            ResponseEntity<Location[]> responseEntity = restTemplate.exchange(locationApiUrl, HttpMethod.GET, entity, Location[].class);
            Location[] locations = responseEntity.getBody();
            HttpStatus statusCode = responseEntity.getStatusCode();
            try {
                System.out.println(locations[0]);
                assert (locations[0].getName() != null);
                assert (locations[1].getName() != null);
                assert (locations[0].getId() != null);
                assert (locations[1].getId() != null);
                assert (statusCode.is2xxSuccessful());
            } catch (NullPointerException nullPointerException) {
                fail("Lokacije nisu uspesno dobavljene.");
                System.out.println(nullPointerException.getMessage());
            }
        } catch (Exception exception) {
            fail("shouldReturnAllLocations test nije uspeo.");
            System.out.println(exception.getMessage());
        }
    }

    @Test //test 2
    public void shouldReturnLocationById() {
        String locationApiUrl = "http://localhost:" + port + "/location/10138";

        HttpHeaders headers = getAuthenticationHeaders();
        HttpEntity<Location> entity = new HttpEntity<>(null, headers);
        TestRestTemplate restTemplate = new TestRestTemplate();
        try {
            ResponseEntity<Location> responseEntity = restTemplate.exchange(locationApiUrl, HttpMethod.GET, entity, Location.class);
            Location location = responseEntity.getBody();
            HttpStatus statusCode = responseEntity.getStatusCode();
            try {
                assert (location.getName().equals("Beograd"));
                System.out.println(location.getId());
                assert (location.getId() == 10138L);
                assert (statusCode.is2xxSuccessful());
            } catch (NullPointerException nullPointerException) {
                fail("Lokacija po id-u nije uspesno dobavljena.");
                System.out.println(nullPointerException.getMessage());
            }
        } catch (Exception exception) {
            fail("shouldReturnLocationById test nije uspeo.");
            System.out.println(exception.getMessage());
        }
    }

    @Test //test 3
    public void shouldNOTReturnLocationByIdBecauseItDoesntExist() {
        String locationApiUrl = "http://localhost:" + port + "/location/99999";

        HttpHeaders headers = getAuthenticationHeaders();
        HttpEntity<Location> entity = new HttpEntity<>(null, headers);
        TestRestTemplate restTemplate = new TestRestTemplate();
        try {
            ResponseEntity<Location> responseEntity = restTemplate.exchange(locationApiUrl, HttpMethod.GET, entity, Location.class);
            Location location = responseEntity.getBody();
            try {
                System.out.println(location);
                //ukoliko objekat koji dobijamo sa API-a ima u sebi validan ID i validan naziv, test je pao.
                assert (location.getName() == null);
                assert (location.getId() == null);
            } catch (Exception exception) {
                fail("Nepostojeca lokacija po id-u je uspesno pronadjena. Test je pao.");
                System.out.println(exception.getMessage());
            }
        } catch (Exception exception) {
            fail("shouldNOTReturnLocationByIdBecauseItDoesntExist test nije uspeo.");
            System.out.println(exception.getMessage());
        }
    }

    @Test //test 4
    public void shouldEditLocation() {
        String locationApiUrl = "http://localhost:" + port + "/location";
        Location location = new Location(10140L, "Nije Zrenjanin");
        HttpHeaders headers = getAuthenticationHeaders();
        HttpEntity<Location> entity = new HttpEntity<>(location, headers);
        TestRestTemplate restTemplate = new TestRestTemplate();
        try {
            ResponseEntity<Location> responseEntity = restTemplate.exchange(locationApiUrl, HttpMethod.PUT, entity, Location.class);
            Location retrievedLocation = responseEntity.getBody();
            HttpStatus statusCode = responseEntity.getStatusCode();
            try {
                assert (retrievedLocation.getName().equals("Nije Zrenjanin"));
                assert (retrievedLocation.getId() == 10140L);
                assert (statusCode.is2xxSuccessful());
            } catch (NullPointerException nullPointerException) {
                fail("Lokacija nije uspesno izmenjena.");
                System.out.println(nullPointerException.getMessage());
            }
        } catch (Exception exception) {
            fail("shouldEditLocation test nije uspeo.");
            System.out.println(exception.getMessage());
        }
    }

    @Test //test 5
    public void shouldRevertEditedLocationChanges() {
        String locationApiUrl = "http://localhost:" + port + "/location";
        Location location = new Location(10140L, "Zrenjanin");
        HttpHeaders headers = getAuthenticationHeaders();
        HttpEntity<Location> entity = new HttpEntity<>(location, headers);
        TestRestTemplate restTemplate = new TestRestTemplate();
        try {
            ResponseEntity<Location> responseEntity = restTemplate.exchange(locationApiUrl, HttpMethod.PUT, entity, Location.class);
            Location retrievedLocation = responseEntity.getBody();
            HttpStatus statusCode = responseEntity.getStatusCode();
            try {
                assert (retrievedLocation.getName().equals("Zrenjanin"));
                assert (retrievedLocation.getId() == 10140L);
                assert (statusCode.is2xxSuccessful());
            } catch (NullPointerException nullPointerException) {
                fail("Lokacija nije uspesno izmenjena.");
                System.out.println(nullPointerException.getMessage());
            }
        } catch (Exception exception) {
            fail("shouldRevertEditedLocationChanges test nije uspeo.");
            System.out.println(exception.getMessage());
        }
    }

    @Test //test 6
    public void shouldInsertNewLocation() {
        String naziv = "GRAD 123";

        String locationApiUrl = "http://localhost:" + port + "/location";
        Location location = new Location(naziv);
        HttpHeaders headers = getAuthenticationHeaders();
        HttpEntity<Location> entity = new HttpEntity<>(location, headers);
        TestRestTemplate restTemplate = new TestRestTemplate();
        try {
            ResponseEntity<Location> responseEntity = restTemplate.exchange(locationApiUrl, HttpMethod.POST, entity, Location.class);
            Location retrievedLocation = responseEntity.getBody();
            HttpStatus statusCode = responseEntity.getStatusCode();
            try {
                assert (retrievedLocation.getName().equals(naziv));
                System.out.println(retrievedLocation.getName().equals(naziv));
                assert (statusCode.is2xxSuccessful());
            } catch (NullPointerException nullPointerException) {
                fail("Lokacija nije uspesno dodata.");
                System.out.println(nullPointerException.getMessage());
            }
        } catch (Exception exception) {
            fail("shouldInsertNewLocation test nije uspeo.");
            System.out.println(exception.getMessage());
        }
    }

    @Test //test 7
    public void shouldDeleteNewlyInsertedLocationByName() {
        String naziv = "GRAD 123";

        String locationApiUrl = "http://localhost:" + port + "/location/delete-by-name/" + naziv;
        HttpHeaders headers = getAuthenticationHeaders();
        HttpEntity<Location[]> entity = new HttpEntity<>(null, headers);
        TestRestTemplate restTemplate = new TestRestTemplate();
        try {
            ResponseEntity<Location[]> responseEntity = restTemplate.exchange(locationApiUrl, HttpMethod.DELETE, entity, Location[].class);
            Location[] retrievedLocations = responseEntity.getBody();
            HttpStatus statusCode = responseEntity.getStatusCode();
            try {
                boolean locationIsFound = false;
                //ukoliko je lokacija pronadjena, test nije prosao
                for (Location location : retrievedLocations) {
                    if (location.getName().equals(naziv)) {
                        locationIsFound = true;
                        break;
                    }
                }

                assert (!locationIsFound);
                assert (statusCode.is2xxSuccessful());
            } catch (NullPointerException nullPointerException) {
                fail("Lokacija nije uspesno izbrisana.");
                System.out.println(nullPointerException.getMessage());
            }
        } catch (Exception exception) {
            fail("shouldDeleteNewlyInsertedLocationByName test nije uspeo.");
            System.out.println(exception.getMessage());
        }
    }

    @Test //test 8
    public void shouldDeleteInsertedLocationById() {
        //prvo unosimo novu lokaciju
        String naziv = "Grad koji ce biti izbrisan";

        String locationApiUrl = "http://localhost:" + port + "/location";
        Long idGradaKojiCeBitiIzbrisan = null;
        Location location = new Location(naziv);
        HttpHeaders headers = getAuthenticationHeaders();
        HttpEntity<Location> entity = new HttpEntity<>(location, headers);
        TestRestTemplate restTemplate = new TestRestTemplate();
        try {
            ResponseEntity<Location> responseEntity = restTemplate.exchange(locationApiUrl, HttpMethod.POST, entity, Location.class);
            Location retrievedLocation = responseEntity.getBody();
            HttpStatus statusCode = responseEntity.getStatusCode();
            try {
                //postavljamo vrednost id-a grada koji ce biti izbrisan.
                idGradaKojiCeBitiIzbrisan = retrievedLocation.getId();
                assert (statusCode.is2xxSuccessful());
            } catch (NullPointerException nullPointerException) {
                fail("Lokacija nije uspesno dodata.");
                System.out.println(nullPointerException.getMessage());
            }
        } catch (Exception exception) {
            fail("shouldInsertNewLocation test nije uspeo.");
            System.out.println(exception.getMessage());
        }
        //ukoliko je id grada null, grad nije uspesno napravljen
        if (idGradaKojiCeBitiIzbrisan == null) {
            fail("Grad nije uspesno napravljen.");
        } else {
            //sada brisemo taj grad
            locationApiUrl = "http://localhost:" + port + "/location/" + idGradaKojiCeBitiIzbrisan;
            headers = getAuthenticationHeaders();
            entity = new HttpEntity<>(null, headers);
            restTemplate = new TestRestTemplate();
            try {
                ResponseEntity<Location[]> responseEntity = restTemplate.exchange(locationApiUrl, HttpMethod.DELETE, entity, Location[].class);
                Location[] retrievedLocations = responseEntity.getBody();
                HttpStatus statusCode = responseEntity.getStatusCode();
                try {
                    boolean locationIsFound = false;
                    //ukoliko je lokacija pronadjena, test nije prosao
                    for (Location locationObject : retrievedLocations) {
                        if (locationObject.getName().equals(naziv)) {
                            locationIsFound = true;
                            break;
                        }
                    }

                    assert (!locationIsFound);
                    assert (statusCode.is2xxSuccessful());
                } catch (NullPointerException nullPointerException) {
                    fail("Lokacija nije uspesno izbrisana.");
                    System.out.println(nullPointerException.getMessage());
                }
            } catch (Exception exception) {
                fail("shouldDeleteInsertedLocationById test nije uspeo.");
                System.out.println(exception.getMessage());
            }
        }
    }

    @Test //test 9
    public void shouldFindLocationByName() {
        String name = "Beograd";
        String locationApiUrl = "http://localhost:" + port + "/location/find-by-name/" + name;
        HttpHeaders headers = getAuthenticationHeaders();
        HttpEntity<Location> entity = new HttpEntity<>(null, headers);
        TestRestTemplate restTemplate = new TestRestTemplate();
        try {
            ResponseEntity<Location> responseEntity = restTemplate.exchange(locationApiUrl, HttpMethod.GET, entity, Location.class);
            Location retrievedLocation = responseEntity.getBody();
            HttpStatus statusCode = responseEntity.getStatusCode();
            try {
                assert (retrievedLocation.getName().equals(name));
                assert (statusCode.is2xxSuccessful());
            } catch (NullPointerException nullPointerException) {
                fail("Lokacija nije uspesno pronadjena.");
                System.out.println(nullPointerException.getMessage());
            }
        } catch (Exception exception) {
            fail("shouldFindLocationByName test nije uspeo.");
            System.out.println(exception.getMessage());
        }
    }

    @Test //test 10
    public void shouldNotFindLocationByNameBecauseITDoesntExist() {
        String name = "Neki Izmisljeni Grad";
        String locationApiUrl = "http://localhost:" + port + "/location/find-by-name/" + name;
        HttpHeaders headers = getAuthenticationHeaders();
        HttpEntity<Location> entity = new HttpEntity<>(null, headers);
        TestRestTemplate restTemplate = new TestRestTemplate();
        try {
            ResponseEntity<Location> responseEntity = restTemplate.exchange(locationApiUrl, HttpMethod.GET, entity, Location.class);
            Location retrievedLocation = responseEntity.getBody();
            try {
                //lokacija mora biti null ukoliko nije pronadjena.
                assert (retrievedLocation == null);
            } catch (NullPointerException nullPointerException) {
                fail("Lokacija je pronadjena sto znaci da je test pao.");
                System.out.println(nullPointerException.getMessage());
            }
        } catch (Exception exception) {
            fail("shouldNotFindLocationByNameBecauseITDoesntExist test nije uspeo.");
            System.out.println(exception.getMessage());
        }
    }



    public HttpHeaders getAuthenticationHeaders() {
        HttpHeaders headers = new HttpHeaders();
        //base64 encoding od "admin:admin"
        headers.add("authorization", "Basic YWRtaW46YWRtaW4=");
        return headers;
    }
}
