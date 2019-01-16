beforeEach(() => {
    cy.request('POST', 'https://autoscout23.herokuapp.com/new-make', {
        "make": "Ferrari"
    })
});

describe('Create a new car', () => {
    it('Successfully creates a new car', () => {

        cy.visit('/');

        cy.get("#new-car-button").click();

        cy.get("#new-car-model-input").click().type("F430 Spider");

        cy.get("#new-car-make-select").click().get("#new-car-make-select-options").contains("Ferrari").click();

        cy.get("#new-car-owner-input").click().type("Jordy");

        cy.get("#new-car-price-input").click().type("75400");

        cy.get("#new-car-milage-input").click().type("17250");

        cy.get("#new-car-desciption-input").click().type("This car added using Cypress End-2-End testing!");

        cy.get("#new-car-imageURL-input").click().type("http://www.complexmania.com/wp-content/uploads/2016w/12/2009-ferrari-f430-spider-004.jpg");

        cy.get("#new-car-submit-button").click();
    })
});