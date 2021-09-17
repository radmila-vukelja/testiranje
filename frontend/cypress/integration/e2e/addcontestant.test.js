
describe('Add Club page', () => {

    beforeEach(() => {
        //prijava korisnika
        localStorage.setItem("credentials", "YWRtaW46YWRtaW4=");
        localStorage.setItem("korisnik", "{\"id\":3,\"username\":\"admin\",\"roles\":[\"ROLE_ADMIN\"]}");
        cy.visit('/home');
    })

    //test 9
    it('should load add-club page', () => {
        cy.get("#add-new-club").click();
        cy.contains('Unesite Naziv Kluba');
        cy.contains('Izaberite lokaciju');
        cy.contains('Unesite URL slike');
        cy.contains('Dodaj nov klub');
        cy.contains('Pogledajte kako ce izgledati vas klub');
        cy.contains('Primer vaseg kluba');
    })

    //test 10
    it('should show mocked club', () => {
        let clubName = 'Obilic';
        let clubPictureUrl = 'https://www.karateklubsokonovisad.com/images/Naslovna/3grupa-min.jpg';
        cy.get('#add-new-club').click();
        cy.get('#clubname').type(clubName);
        cy.wait(1500)
        cy.get('#location-dropdown').last().click();
        cy.get('.mat-option').contains('Beograd').last().click();
        cy.get('#url-slike').type(clubPictureUrl);
        cy.get('#create-mock-club').click();
        cy.wait(500)
        cy.contains('Naziv kluba: Obilic');
        cy.contains('Lokacija kluba: Beograd');  
    })

      //test 11
      it('should fail at adding club because picture url was not added', () => {
        let clubName = 'Obilic';
        cy.get('#add-new-club').click();
        cy.get('#clubname').type(clubName);
        cy.wait(1500)
        cy.get('#location-dropdown').last().click();
        cy.get('.mat-option').contains('Beograd').last().click();
        cy.wait(200)
        cy.get('#add-new-club-button').last().click();
        cy.contains('Morate da popunite sva polja.');  
        cy.contains('U redu');  
    })

      //test 12
      it('should add club', () => {
        let clubName = 'Obilic';
        let clubPictureUrl = 'https://www.karateklubsokonovisad.com/images/Naslovna/3grupa-min.jpg';
        cy.get('#add-new-club').click();
        cy.get('#clubname').type(clubName);
        cy.wait(1500)
        cy.get('#location-dropdown').last().click();
        cy.get('.mat-option').contains('Beograd').last().click();
        cy.wait(200)
        cy.get('#url-slike').type(clubPictureUrl);
        cy.get('#add-new-club-button').last().click();
        cy.contains('Uspesno ste dodali klub');  
    })

})
