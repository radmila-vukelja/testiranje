package rs.tfzr.controllertest;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.internal.matchers.Null;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;
import rs.tfzr.SeminarskiApplication;

import org.junit.Before;
import org.skyscreamer.jsonassert.JSONAssert;
import rs.tfzr.model.Location;

import java.util.List;

import static org.junit.jupiter.api.Assertions.fail;
import static org.junit.platform.commons.function.Try.failure;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeminarskiApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class LocationControllerIT {

    @LocalServerPort
    private int port;

    @Test //test 1
    public void shouldReturnAllLocations() {
        String locationApiUrl = "http://localhost:" + port + "/location/all";

        HttpHeaders headers = getAuthenticationHeaders();
        HttpEntity<Location[]> entity = new HttpEntity<>( null, headers);
        TestRestTemplate restTemplate = new TestRestTemplate();
        try {
            ResponseEntity<Location[]> responseEntity = restTemplate.exchange(locationApiUrl, HttpMethod.GET, entity, Location[].class);
            Location[] locations = responseEntity.getBody();
            HttpStatus statusCode = responseEntity.getStatusCode();
            try {
                System.out.println(locations[0]);
                System.out.println(locations[1]);
                assert (locations[0].getName().equals("Beograd"));
                assert (locations[1].getName().equals("Novo Milosevo"));
                assert (statusCode.is2xxSuccessful());
            }catch (NullPointerException nullPointerException){
                fail("Lokacije nisu uspesno dobavljene.");
                System.out.println(nullPointerException.getMessage());
            }
        }catch (Exception exception){
            fail("shouldReturnAllLocations test nije uspeo.");
            System.out.println(exception.getMessage());
        }
    }

    @Test //test 2
    public void shouldReturnLocationById() {
        String locationApiUrl = "http://localhost:" + port + "/location/10138";

        HttpHeaders headers = getAuthenticationHeaders();
        HttpEntity<Location> entity = new HttpEntity<>( null, headers);
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
            }catch (NullPointerException nullPointerException){
                fail("Lokacija po id-u nije uspesno dobavljena.");
                System.out.println(nullPointerException.getMessage());
            }
        }catch (Exception exception){
            fail("shouldReturnLocationById test nije uspeo.");
            System.out.println(exception.getMessage());
        }
    }

    @Test //test 3
    public void shouldEditLocation() {
        String locationApiUrl = "http://localhost:" + port + "/location";
        Location location = new Location(10140L, "Nije Zrenjanin");
        HttpHeaders headers = getAuthenticationHeaders();
        HttpEntity<Location> entity = new HttpEntity<>( location, headers);
        TestRestTemplate restTemplate = new TestRestTemplate();
        try {
            ResponseEntity<Location> responseEntity = restTemplate.exchange(locationApiUrl, HttpMethod.PUT, entity, Location.class);
            Location retrievedLocation = responseEntity.getBody();
            HttpStatus statusCode = responseEntity.getStatusCode();
            try {
                assert (retrievedLocation.getName().equals("Nije Zrenjanin"));
                assert (retrievedLocation.getId() == 10140L);
                assert (statusCode.is2xxSuccessful());
            }catch (NullPointerException nullPointerException){
                fail("Lokacija nije uspesno izmenjena.");
                System.out.println(nullPointerException.getMessage());
            }
        }catch (Exception exception){
            fail("shouldEditLocation test nije uspeo.");
            System.out.println(exception.getMessage());
        }
    }

    /*  @PutMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity edit(@RequestBody Location location) {
        return new ResponseEntity(locationService.edit(location), HttpStatus.OK);
    }*/

    public HttpHeaders getAuthenticationHeaders() {
        HttpHeaders headers = new HttpHeaders();
        //base64 encoding od "admin:admin"
        headers.add("authorization", "Basic YWRtaW46YWRtaW4=");
        return headers;
    }
}
