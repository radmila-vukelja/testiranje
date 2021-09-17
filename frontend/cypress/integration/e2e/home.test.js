
describe('Home page', () => {

    beforeEach(() => {
        //prijava korisnika
        localStorage.setItem("credentials", "YWRtaW46YWRtaW4=");
        localStorage.setItem("korisnik", "{\"id\":3,\"username\":\"admin\",\"roles\":[\"ROLE_ADMIN\"]}");
        cy.visit('/home');
    })

    //test 8
    it('should load home page', () => {
        cy.contains('Pogledajte Sve Clanove Kluba');
        cy.contains('Izmenite Informacije O Klubu');
        cy.contains('Izbrisite Klub');
    })
})
