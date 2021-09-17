
describe('Login page', () => {

    beforeEach(() => {
        cy.visit('/login');
    })

    //test 5
    it('should load login page', () => {
        cy.contains('Ulogujte se');
        cy.contains('Unesite Vase Korisnicko Ime');
        cy.contains('Unesite Vasu Sifru');
        cy.contains('Ukoliko nemate nalog, mozete se registrovati');
    })

    //test 6
    it('should fail at login because user does not exist', () => {
        cy.contains('Ulogujte se');
        let username = 'admin';
        let password = 'aadmfsin';
        cy.get('#username').type(username);
        cy.get('#password').type(password);
        cy.get('#login-button').last().click();
        cy.contains('Ne postoji korisnik sa tim kredencijalima');
    })

    //test 7
    it('should login with right credentials', () => {
        cy.contains('Ulogujte se');
        let username = 'admin';
        let password = 'admin';
        cy.get('#username').type(username);
        cy.get('#password').type(password);
        cy.get('#login-button').last().click();
        cy.contains('Pogledajte Sve Clanove Kluba');
        cy.contains('Izmenite Informacije O Klubu');
        cy.contains('Izbrisite Klub');
    })

})
