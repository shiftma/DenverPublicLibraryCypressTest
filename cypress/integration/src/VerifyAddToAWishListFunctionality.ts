describe('Wish list functionality', function() {
    beforeEach(() => {
      cy.search('Dandelion wine');
    })
  
    it('Add found book to a whishlist', function() {
      cy.get('#addtolist_1')
      .click()
      
      cy.get('#dashTitleList').contains('My Lists')
      
      cy.get('#ml_workinglist ul a').first().contains('Dandelion wine')
      .reload()
      .get('#ml_workinglist ul a').first().contains('Dandelion wine')
    })

    it('Remove a book from a whishlist', function() {
      cy.get('#addtolist_1')
      .click()
      
      cy.get('#dashTitleList').contains('My Lists')
      
      cy.get('#ml_workinglist ul a').first().contains('Dandelion wine')
      .click()
      
      cy.get('#addtolist_1 > a').contains('Remove')
      .click()
      .reload()
      
      cy.get('#ml_workinglist ul a').should('not.exist');
    })
  })