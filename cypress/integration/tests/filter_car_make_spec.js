beforeEach(() => {
    cy.request('POST', 'https://autoscout23.herokuapp.com/new-car', {
        "make": "Ferrari",
        "model": "F430",
        "mileage": 1553,
        "carOwner": "Alex",
        "description": "This is a car description...",
        "price": 75600,
        "image": "https://cdn.bringatrailer.com/wp-content/uploads/2017/11/IMG_9067-940x627.jpg"
    })
});

describe('Filter car by make', () => {
    it('Successfully filters car by make', () => {

        cy.visit('/');

        cy.get("#filter-car-make-select").click().get("#car-make-select-options").contains("Ferrari").click();

        cy.get("#car-make-search-button").click();
    })
});