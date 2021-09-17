
describe('Registration page', () => {

    beforeEach(() => {
        cy.visit('/register');
    })

    //test 1
    it('should load registration page', () => {
        cy.contains('Registrujte se');
        cy.contains('Unesite korisnicko ime');
        cy.contains('Unesite ime');
        cy.contains('Unesite prezime');
        cy.contains('Unesite email');
        cy.contains('Unesite sifru');
        cy.contains('Ponovite sifru');
    })
    //test 2
    it('should fail at registration because username was not added', () => {
        cy.contains('Registrujte se');
        cy.get('#register-button').last().click();
        cy.contains('Korisnicko ime mora biti duze od 4 karaktera');
    })

    //test 3
    it('should fail at registration because passwords do not match', () => {
        cy.contains('Registrujte se');
        let randomString = generateRandomString(5);
        let username = 'radmila' + randomString;
        let name = 'Radmila' + randomString;
        let lastname = 'Vukelja' + randomString;
        let email = randomString + '-radmila@gmail.com';
        let password = 'sifra123' + randomString;
        let repeatPassword = 'sifra321' + randomString;
        console.log(generateRandomString(5));
        cy.get('#username').type(username);
        cy.get('#name').type(name);
        cy.get('#lastname').type(lastname);
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('#repeat-password').type(repeatPassword);
        cy.get('#register-button').last().click();
        cy.contains('Sifre se moraju podudarati i moraju biti duze od 4 karaktera');
    })

    //test 4
    it('registration should be sucessful', () => {
        cy.contains('Registrujte se');
        let randomString = generateRandomString(5);
        let username = 'radmila' + randomString;
        let name = 'Radmila' + randomString;
        let lastname = 'Vukelja' + randomString;
        let email = randomString + '-radmila@gmail.com';
        let password = 'sifra123' + randomString;
        let repeatPassword = 'sifra123' + randomString;
        cy.get('#username').type(username);
        cy.get('#name').type(name);
        cy.get('#lastname').type(lastname);
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('#repeat-password').type(repeatPassword);
        cy.get('#register-button').last().click();
        cy.contains('Registracija je uspesna! Mozete se ulogovati.');
    })

})

function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

