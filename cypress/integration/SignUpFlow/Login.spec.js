
context('Sign up flow', () => {
    it('enters incorrect email address', () => {
        cy.visit('/')
        cy.get('#email-input').type('bcmcadamATgmail.com')
        cy.get('#email-input').should('have.class', 'ng-invalid-email')
        cy.get('.btn').click()
        //submission is unsuccessful due to invalid email address
        cy.url().should('include', '/auth/sign_in')  
        cy.get('#email-input').should('have.value', 'bcmcadamATgmail.com')
    })
  
    it('enters unknown valid email', () => {
        cy.get('#email-input').clear()
        cy.get('#email-input').type('test1email@gmail.com')
        cy.get('#email-input').should('have.class', 'ng-valid-email')
        cy.get('.btn').click()
        cy.get('.alert').should('have.text', 'We couldn\'t find this email. Try signing up or entering a different email.')
    })

    it('attempts account creation with registered email', () => {
        cy.get('#signup-link > .ng-scope').click({ force: true })
        cy.get('#emailInput').clear()
        cy.get('#emailInput').type('bcmcadam@gmail.com') 
        cy.get('#firstNameInput').type('test')
        cy.get('#lastNameInput').type('user')
        cy.get('#passwordInput').type('field5wire')
        cy.get('#explicitAgreement').click()
        cy.get('.btn').click()
        cy.get('.alert').should('have.text', 'An account with that email address already exists.')
    })

    it('can create new user', () => {
        cy.visit('/')
        cy.get('#signup-link > .ng-scope').click({ force: true })
        cy.get('#firstNameInput').should('have.class', 'ng-pristine')
        cy.get('#firstNameInput').type('test')
        cy.get('#firstNameInput')
            .should('have.class', 'ng-dirty')
            .and('have.class', 'ng-valid')
        cy.get('#lastNameInput').should('have.class', 'ng-pristine')
        cy.get('#lastNameInput').type('user')
        cy.get('#lastNameInput')
            .should('have.class', 'ng-dirty')
            .and('have.class', 'ng-valid')
        cy.get('#emailInput').type('testUser1@gmail.com')
        cy.get('#emailInput').should('have.class', 'ng-valid-email')
        cy.get('#passwordInput')
            .type('field5')
            .should('have.class', 'ng-dirty')
            .and('have.class', 'ng-invalid')
            .and('have.class', 'ng-invalid-minlength')
            .type('wire')
            .should('have.class', 'ng-valid')
        cy.get('.btn').should('be.disabled')
        cy.get('#explicitAgreement').click()
        cy.get('.btn').should('be.enabled')
        //I'm not actually submiting the new user creation because I didn't  want to spam the database with test users that I can't yet delete but if there is a delete user api, I would use it to clean up the user created during the test run. If not, I would create a deleteScript to remove entries the automation runs after each run    
    })
});
