// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

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
        //cy.log(response.headers['set-cookie'][0].value);
        //cy.setCookie('_fieldwire_api_session', response.headers['set-cookie'][0].value )
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

    // cy.request({
    //     method: 'GET',
    //     url: '/api/v3/current_user', 
    //     followRedirect: true,
    //     headers:{
    //         'Fieldwire-Platform': 'web',
    //         'Fieldwire-User-Session-Id': Cypress.env("sessionId"),
    //         'Fieldwire-Released-At': '2022-04-13T18:08:09Z',
    //         'Fieldwire-Version': '2020-06-22',
    //         'Accept': 'application/json',
    //         'Fieldwire-User-Id': Cypress.env("id"),
    //         'Fieldwire-User-Token': Cypress.env("token"),
    //         'sec-ch-ua-mobile': '?0',
    //         'Fieldwire-Release-Id': 'b5435f99',
    //         'Fieldwire-Filter': 'active',
    //         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36',
    //         'sec-ch-ua-platform': "macOS",
    //         'Sec-Fetch-Site': 'same-origin',
    //         'Sec-Fetch-Mode': 'cors',
    //         'Sec-Fetch-Dest': 'empty',
    //         'Referer': 'https://app.fieldwire.com/',
    //         'Accept-Encoding': 'gzip, deflate, br',
    //         'Accept-Language': 'en,hu;q=0.9,en-US;q=0.8'
    //     }
    // })
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
