beforeEach(() => {
    cy.request('POST', 'https://autoscout23.herokuapp.com/new-make', {
        "make": "Ferrari"
    });
});

describe('Create a new car', () => {
    it('Successfully creates a new car', () => {

        let car = {
            make: "Ferrari",
            model: "F430 Spider",
            mileage: 17250,
            carOwner: "Jordy",
            description: "This car added using Cypress End-2-End testing!",
            price: 49500,
            image: "http://www.complexmania.com/wp-content/uploads/2016w/12/2009-ferrari-f430-spider-004.jpg"
        };

        let count = 0;

        cy.visit('/');

        cy.get("#new-car-button").click();

        cy.get("#new-car-model-input").click().type(car.model.toString());

        cy.get("#new-car-make-select").click().get("#new-car-make-select-options").contains(car.make.toString()).click();

        cy.get("#new-car-owner-input").click().type(car.carOwner.toString());

        cy.get("#new-car-price-input").click().type(car.price.toString());

        cy.get("#new-car-milage-input").click().type(car.mileage.toString());

        cy.get("#new-car-desciption-input").click()
            .type(car.description.toString());

        cy.get("#new-car-imageURL-input").click()
            .type(car.image.toString());

        cy.get("#car-content-grid").children()
            .then((response) => {
                count = response.length;
            });

        cy.get("#new-car-submit-button").click();

        cy.wait(2500);

        cy.request('GET', 'https://autoscout23.herokuapp.com/get-latest-car')
            .then((response) => {
                expect(response.body).to.have.property('model', car.model);
                expect(response.body).to.have.property('make', car.make);
                expect(response.body).to.have.property('mileage', car.mileage);
                expect(response.body).to.have.property('description', car.description);
                expect(response.body).to.have.property('price', car.price);
                expect(response.body).to.have.property('image', car.image);
            });

        cy.get("#car-content-grid").children()
            .then(() => {
                cy.get("#car-content-grid").children().should('have.length', count + 1);
            });
    })
});