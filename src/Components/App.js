import React, {Component, Fragment} from "react";
import {CssBaseline} from "@material-ui/core";
import {Footer, Header} from "./Layouts";
import Content from "./Content/Content";
import Menu from "./Content/Menu";

export const handleRequestBill = () => {
    alert("Bill has been requested.");
};

// For testing only
export const add = (x, y) => {
    return x + y;
};

//const backendURL = "http://localhost:9000";
const backendURL = "https://autoscout23.herokuapp.com";

export default class extends Component {
    state = {
        dishes: [],
        //dishes: dishes,
        allergyNames: [],
        allergies: [],
        cars: [],
        car: {},
        makes: [],
        makeNames: [],
        //allergies: allergies,
        categoryNames: ['TEST'],
        //categories: categories,
        categories: [],
        dish: {},
        order: [],
        editMode: false,
        isLoaded: false,//
        showAll: true
    };

    componentWillMount() {
        this.fetchCarData();
        this.fetchMakeData();
        //this.fetchProductData();
        //this.fetchAllergyData();
        //this.fetchCategoryData();
    }

    fetchCarData = () => {
        fetch(backendURL + "/get-all-cars")
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.list.map(car => (
                {
                    id: car.carID,
                    make: car.make,
                    model: car.model,
                    mileage: car.mileage,
                    price: car.price,
                    created: car.date_created,
                    updated: car.date_updated,
                    image: car.image
                }
            ), console.log(parsedJSON)))
            .then(data => this.setState({
                cars: data
            }))
            .catch(error => console.log("There was an error during: 'fetchCarData'", error))
    };

    fetchCarOfMake = (make) =>  {
        fetch(backendURL + "/car-make/" + make)
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.list.map(car => (
                {
                    id: car.carID,
                    make: car.make,
                    model: car.model,
                    mileage: car.mileage,
                    price: car.price,
                    created: car.date_created,
                    updated: car.date_updated,
                    image: car.image
                }
            )))
            .then(data => this.setState({
                cars: data
            }))
            .catch(error => console.log("There was an error during: 'fetchCarOfMake'", error))
    };

    fetchMakeData() {
        fetch(backendURL + "/get-all-makes")
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.list.map(make => (
                {
                    id: make.id,
                    make: make.make
                }
            )))
            .then(data => this.setState({
                makes: data,
                makeNames: data.map((item) => item.make),
            }))
            .catch(error => console.log("There was an error during: 'fetchMakeData'", error));
    }

    // let sortedArray = menuItems.order.items.sort(sortByElement("name"));

    fetchAllergyData() {
        fetch(backendURL + "/allergies")
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.allergies.map(allergy => (
                {
                    name: `${allergy.name}`,
                    id: `${allergy.id}`
                }
            )))
            .then(data => this.setState({
                allergies: data,
                allergyNames: data.map((item) => item.name),
                isLoaded: true // Not using it right now
            }))
            .catch(error => console.log("There was an error during: 'fetchAllergyData'", error))
    }

    fetchCategoryData() {
        fetch("http://localhost:9050/categories")
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.categories.map(category => (
                {
                    name: `${category.name}`,
                    id: `${category.id}`
                }
            )))
            .then(data => this.setState({
                categories: data,
                categoryNames: data.map((item) => item.name),
                isLoaded: true // Not using it right now
            }))
            .catch(error => console.log("There was an error during: 'fetchCategoryData' ", error))
    }

    fetchProductData() {
        fetch("http://localhost:9050/menu")
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.products.map(product => (
                {
                    id: `${product.productId}`,
                    title: `${product.productName}`,
                    category: this.state.categories.find(_cat => (_cat.id === `${product.categoryId}`)).name,
                    allergies: [this.state.allergies.filter(_cat => (_cat.id === `${product.categoryId}`)).name],
                    description: `${product.description}`,
                    price: `${product.price}`,
                    amount: 0
                }
            )))
            .then(data => this.setState({
                dishes: data,
                isLoaded: true // Not using it right now
            }))
            .catch(error => console.log("There was an error during: 'fetchProductData'", error))
    }

    handleSubmitCar = car => {

        console.log("Fired");
        console.log(car);

        let newCar = {
            id: "",
            make: car.make,
            model: car.model,
            mileage: car.mileage,
            price: car.price,
            image: car.image
        };

        // let newCar = {
        //     id: "",
        //     make: "Porsche",
        //     model: "911",
        //     mileage: 13437,
        //     price: 78500,
        //     image: "https://s.aolcdn.com/dims-global/dims3/GLOB/legacy_thumbnail/640x400/quality/80/https://s.aolcdn.com/commerce/autodata/images/USC70PRC011A021001.jpg"
        // };

        fetch(backendURL + "/new-car", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                make: car.make,
                model: car.model,
                mileage: car.mileage,
                price: car.price,
                image: (car.image == null) ? "" : car.image
            })
        });

        //this.fetchProductData();

        console.log(newCar);

        this.setState(({cars}) => ({
            cars: [...cars, newCar]
        }));
    };

    handleAddItemToOrder = id => {

        // Increase the amount of a dish
        this.handleSelectEdit((id));
        let temp_dish = this.handleGetDishByID((id));
        temp_dish.amount++;
        this.handleDishEdit(temp_dish);

        // Add item id to order list
        let orderItem = {
            uuid: id,
            name: temp_dish.title
        };
        let newArray = this.state.order.slice();

        newArray.push(orderItem);
        this.setState({order: newArray});
    };

    handleRemoveItemFromOrder = id => {
        // Remove the first item in the array with the same item-id
        for (let i = 0; i < this.state.order.length; i++) {
            if (this.state.order[i].uuid === id) {
                if (this.state.order.length <= 1) {
                    this.setState({order: []});
                }
                else {

                    this.state.order.splice(i, 1);
                    this.setState({order: this.state.order});
                }

                // Decrease the amount of a dish
                this.handleSelectEdit((id));
                let temp_dish = this.handleGetDishByID((id));
                temp_dish.amount--;
                this.handleDishEdit(temp_dish);
                break;
            }
        }
    };

    handleOrderSubmit = () => {
        let content = JSON.stringify({order: {table: {number: 1,}, items: this.state.order}});
        if (this.state.order.length >= 1) {
            // Create new 'json' object from all items in the order list
            let orderObject = {
                action: "PLACEORDER",
                content: content
            };

            //webSocket.send(JSON.stringify(orderObject));

            console.log(orderObject);

            // Reset order and dishes
            this.setState({order: []});
            this.fetchProductData();
            this.setState({showAll: true});
        }
    };

    getDishesByCategory() {
        const initCategories = this.state.categoryNames.reduce(
            (dishes, category) => ({
                ...dishes,
                [category]: []
            }),
            {}
        );

        return Object.entries(
            this.state.dishes.reduce((dishes, dish) => {
                const {category} = dish;

                dishes[category] = [...dishes[category], dish];

                return dishes;
            }, initCategories)
        );
    }

    handleCategorySelect = category => {
        this.setState({
            category
        });
    };

    handleDishSelect = id => {
        this.setState(({dishes}) => ({
            dish: dishes.find(_dish => _dish.id === id),
            editMode: false,
        }));
    };

    handleGetDishByID = id => {
        return this.state.dishes.find(_dish => _dish.id === id);
    };

    handleDishCreate = dish => {

        let newDish = {
            id: "",
            title: dish.title,
            category: dish.categories,
            allergies: [],
            description: dish.description,
            price: 5,
            amount: 0
        };

        console.log("The category id: " + this.state.categories.find(category => (category.name === dish.categories)).id);

        fetch('http://localhost:9050/new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: newDish.id,
                productName: newDish.title,
                categoryId: this.state.categories.find(category => (category.name === dish.categories)).id,
                allergyIds: newDish.allergies,
                description: newDish.description,
                price: newDish.price,
                amount: 0
            })
        });
        this.setState(({dishes}) => ({
            dishes: [...dishes, newDish]
        }));
    };

    handleCarDelete = id => {

        console.log("Delete - Fired --> id: " + id);

        fetch(backendURL + "/car-delete/" + id, {
            method: 'DELETE'
        });

        this.setState(({cars, car, editMode}) => ({
            cars: cars.filter(_car => _car.id !== id),
            // Check if editMode previously stored dish (in state) is equal to the selected dish
            // This is to prevent deleting a different dish, switching the currently selected state.dish editMode
            editMode: car.id === id ? false : editMode,
            // Check if id previously stored dish (in state) is equal to the selected dish
            // This is to prevent deleting a different dish, switching the currently selected state.dish
            car: car.id === id ? {} : car
        }));
    };

    handleSelectEdit = id => {
        this.setState(({dishes}) => ({
            dish: dishes.find(_dish => _dish.id === id),
            editMode: true
        }));
    };

    handleDishEdit = dish => {

        // Loop through all dishes
        for (let i = 0; i < this.state.dishes.length; i++) {
            // Find the correct dish
            if (this.state.dishes[i].uuid === dish.uuid) {

                let newDishArray = this.state.dishes.slice();

                newDishArray[i].dish = dish;

                this.setState({dishes: newDishArray});
                break;
            }
        }
    };

    handleToggleShowAll = () => {
        this.setState({showAll: !this.state.showAll})
    };

    render() {
        const dishes = this.getDishesByCategory();
        const cars = this.state.cars,
            {category, dish, editMode, showAll} = this.state;
        return (/*theme={darkTheme}*/
            <Fragment>
                {/*CssBaseline handles the different baseline css browsers have, to make it more consitant across multiple different browsers*/}
                <CssBaseline/>

                <Header
                    //allergies={this.state.allergyNames}
                    allergies={this.state.makeNames}
                    makes={this.state.makeNames}
                    categories={this.state.categoryNames}
                    //onDishCreate={this.handleSubmitCar}
                    onDishCreate={this.handleSubmitCar}
                    toggleShowAll={this.handleToggleShowAll}
                    showAll={showAll}
                    order={this.state.order}
                />

                <div style={{display: 'flex', alignItems: 'stretch', height: 'calc(100% - 64px - 48px)'}}>
                    <div style={{flexGrow: 1, width: '25%'}}>
                        <Menu makes={this.state.makeNames}
                              allergies={this.categoryNames}
                              categories={this.categoryNames}
                              onSubmit={this.handleRequestBill}
                              onSearch={this.fetchCarOfMake}
                              onResetFilter={this.fetchCarData}
                        />
                    </div>
                    <div style={{flexGrow: 2, width: '75%'}}>
                        <Content
                            dish={dish}
                            dishes={dishes}
                            cars={cars}
                            category={category}
                            editMode={editMode}
                            allergies={this.state.allergyNames}
                            //allergies={allergies}
                            onSelect={this.handleDishSelect}
                            onDelete={this.handleCarDelete}
                            onSelectEdit={this.handleSelectEdit}
                            onEdit={this.handleDishEdit}
                            onAddItem={this.handleAddItemToOrder}
                            onRemoveItem={this.handleRemoveItemFromOrder}
                            showAll={showAll}
                        />
                    </div>
                </div>

                <Footer
                    //categories={this.state.categoryNames}
                    categories={this.state.makeNames}
                    category={category}
                    onSelect={this.handleCategorySelect}
                    //onSubmit={this.handleOrderSubmit}
                    onSubmit={this.handleSubmitCar}
                    getCarByMake={this.fetchCarOfMake}
                    isEmpty={(this.state.order.length === 0)}
                />
            </Fragment>
        );
    }
}
