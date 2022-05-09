export {};
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
type Url = string;

Cypress.Commands.add('search', (input: string) => {
    const url: Url = 'https://www.denverlibrary.org/'
    return it('Search for book', () => {
        cy
            .visit(url)
            .get('title').contains('Denver Public Library')
        cy
            .get('#views-exposed-form-site-search-page-1')
            .find('input')
            .type(`${input}`)
            .should ('have.value', `${input}`)
        cy    
            .get("#edit-actions")
            .click()
        cy    
            .get('#searchResultsDIV a > span').first().contains(`${input}`)  
     })  
})


declare global {
    namespace Cypress {
       interface Chainable {
           search(value: string): void
           }
       }
   }



  