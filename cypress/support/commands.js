

var setCookie = require('set-cookie-parser');

Cypress.Commands.add('auth', () => {
    cy.request({
        method: 'POST',
        url: '/api/v3/sign_in', 
        followRedirect: true,
        body: {
            "user_login": {
              email: "bcmcadam@gmail.com",
              password: "field5wire",
            },
        },
    }).then((response) => {
        const cookies = response.headers['set-cookie']
        cookies.forEach( cook => {
            
            const c = setCookie(cook)
            const options = {
                'expires': c[0].expires,
                'path': c[0].path
            }

            cy.setCookie(c[0].name, c[0].value, options)
        })

        Cypress.env('token', response.body.auth_token);
        Cypress.env('id', response.body.user.id)
        Cypress.env('sessionId', response.body.user_session_id)
        cy.log(Cypress.env("sessionId"));
        cy.log(Cypress.env("token"));
        cy.log(Cypress.env("id"));
    })
})

Cypress.Commands.add('login', () => {
    cy.visit('/')
    cy.get('#password-input').should('not.exist');
    cy.get('#email-input').type('bcmcadam@gmail.com')
    cy.get('.btn').click()
    cy.get('#password-input')
        .should('exist')
        .and('have.class', 'ng-invalid')
        .and('have.class', 'ng-empty')
    cy.get('#password-input').type("field5wire")
    cy.get('.btn').click()
})
