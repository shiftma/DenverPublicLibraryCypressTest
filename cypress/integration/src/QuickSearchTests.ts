context('Navigate to the Denver public library main page', () => {
    beforeEach(() => {
      cy.visit('https://www.denverlibrary.org/')
    })

    describe('Book search input tests', () =>{
        const regex = /[0-9]/g;
        let isbn;
        it('Search for dandelion wine book', () => {
            cy.get('#views-exposed-form-site-search-page-1')
            .find('input')
            .type("Dandelion wine")
            .should ('have.value', 'Dandelion wine')

            cy.get("#edit-actions")
            .click()

            cy.get('#searchResultsDIV a > span').first().contains('Dandelion wine')
            .click()

            isbn = cy.get('tr:nth-child(11)').invoke('text').contains(regex)
            cy.log(isbn);
        })

        it('Maximum allowed length', () =>{
            cy.get('#views-exposed-form-site-search-page-1')
            .find('input')
            .type('"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."')

            cy.get("#edit-actions")
            .click()
            .url().should('include', 'message.aspx')
            
            cy.get('.ErrorMessage').contains('Execution stopped because a resource limit was reached. No results were returned.')
        })

        it('Xxs attack test - snitch cookie', () =>{
            cy.get('#views-exposed-form-site-search-page-1')
            .find('input')
            .type('<script type=”text/javascript”>var test=’../example.php?cookie_data=’+escape(document.cookie);</script>')
            
            cy.get("#edit-actions")
            .click()
            .url().should('include', 'BadReq=1') 
        })
    })
})
