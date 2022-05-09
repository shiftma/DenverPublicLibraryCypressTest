//TODO: Make it a function that can be called in UI test
// Once book description page is open in UI, save isbn as a context variable
// that can be passed into this function to get book description.
// Once book description from api is returned, use it in UI test to verify book description.

let bookIsbn = 9780062242273;
describe('Open library Api test', () => {
    let bookDescription;
    it('Get book description by isbn - GET', () => {
        cy.request(`/isbn/${bookIsbn}.json`).as('getBookDescription');
        cy.get('@getBookDescription').then(getResponse => {
            expect(getResponse)
            assert.isNotEmpty(getResponse, 'Book description is found for matching isbn')
            bookDescription = getResponse;
            cy.log(bookDescription);
        });
    });
 });