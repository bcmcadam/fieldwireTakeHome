// NewProject.spec.js created with Cypress

const { copyFile } = require("fs");

context('New Project Flows', () => {
    it('can create a new project', () => {
        //Tests the successful creation of a new project
        cy.login()
        cy.get('.new-project').click()
        cy.get('input[name="name"]').type('Test Project')
        cy.get('input[name="code"]').type('Test Code')
        cy.get('.modal-content').within(() => {
            cy.get('.btn').click()
        })
        cy.get('.sample-plans').click()
        cy.get('.modal-footer > .btn-primary').click()
        cy.get('.modal-footer > .btn').click()
        cy.get('.add-default-category > .pointer').click()
        cy.get('.add-category-form')
            .type("Test Category")
            .submit()
        cy.get('.next-btn').click()
        //invite button is disbaled before email address is entered
        cy.get('button').contains('Invite').should('be.disabled')
        cy.get('.invite-textarea').type("test1@email.com")
        cy.get('button').contains('Invite')
            //invite button is enabled after email address is entered
            .should('be.enabled')
            .click()
        cy.get('.modal-footer > [kind="primary"] > .fw-button > span').click()
        cy.get('.next-btn').click()
        cy.get('.text-link-form').type("88888888888")
        cy.get('button').contains('Text me a link')
            .should('be.enabled')
            .click()
        cy.get('.next-btn').click()
    })

    it('can create a new task', () => {
        //test the successful creation of a task
        cy.login()
        cy.get('body').should('include.text', 'Test Project')
        cy.get('.with-code').click()
        cy.get('.floorplan-box-container').within(() => {
            cy.get('.floorplan-thumb').eq(1).click({force: true})
        })
        cy.get('.add-task').click()
        cy.get('.hover-gray').click()
        cy.get('.edit-task-name-input')
            .type("hire contractors")
        cy.get('.btn-toolbar > .btn-primary > .fa').click()
        cy.get('.hover-gray').should('include.text', "hire contractors")
        cy.get('[ng-if="attributeVisible(TaskTypeAttributeKind.STATUS)"]').click()
        cy.get('span').contains('Priority 1').click()
        
        cy.get('[ng-if="attributeVisible(TaskTypeAttributeKind.CATEGORY)"]').click()
        cy.get('.team-name').contains('Test Category') .click()
        cy.get('.messages')
            .should('include.text','hire contractors')
            .should('include.text', 'Changed title to hire contractors')        
            .should('include.text', 'Changed category to Test Category')
        cy.get('[ng-if="attributeVisible(TaskTypeAttributeKind.START_DATE)"]').click()
        cy.get('[data-e2e="task-edit-dismiss"]').click();
        cy.get('.task-item-holder').should('include.text', 'hire contractors')
    })

    it('can delete project', () => {
        //test the sucessful deletion of a project. Also serves as test data clean up
        cy.login()
        cy.get('[data-e2e="Test Project-cog"]')
            .invoke('show')
            .click({force:true})
        cy.get('[ng-click="$ctrl.remove()"]').click()
        cy.get('[ng-model="confirmInput"]').type('Test Project')
        cy.get('[ng-disabled="!enabled()"]').click()
        //Back to empty state afer the project has been deleted
        cy.get('body').contains('Create your first project!').should('be.visible')
    })
});


//bug: Can we add sample plans no button does nothing
//bug: tasks are not visble unless browser window is meets threshold size
//possible bug: hitting back from the create company profile screen (without entering the company info) goes directly into the app
//bug: Project name takes basically anything