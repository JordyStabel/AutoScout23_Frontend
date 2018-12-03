import React, {Component, Fragment} from "react";
import {CssBaseline} from "@material-ui/core";
import {Footer, Header} from "./Layouts";
import Content from "./Content/Content";
import Menu from "./Content/Menu";

export const handleRequestBill = () => {
    alert("Bill has been requested.");
};

export default class extends Component {
    state = {
        dishes: [],
        //dishes: dishes,
        allergyNames: [],
        allergies: [],
        cars:[],
        //allergies: allergies,
        categoryNames: ['Coupe', '4x4', 'Cabriolet', 'Sedan', 'Sport', 'SUV'],
        //categories: categories,
        categories: [],
        dish: {},
        order: [],
        editMode: false,
        isLoaded: false,//
        showAll: true
    };

    componentDidMount() {
        this.fetchCarData();
        //this.fetchProductData();
        //this.fetchAllergyData();
        //this.fetchCategoryData();
    }

    fetchCarData() {
        fetch("http://localhost:9000/cars")
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.cars.map(car => (
                {
                    make: `${car.make}`,
                    model: `${car.model}`,
                    mileage: `${car.mileage}`,
                    price: `${car.price}`,
                    created: `${car.created}`,
                    updated: `${car.updated}`
            }
            )))
            .then(data => this.setState({
                cars: data
            }))
            .catch(error => console.log("There was an error during: 'fetchAllergyData'", error))
    }

    fetchAllergyData() {
        fetch("http://localhost:9050/allergies")
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

    handleDishDelete = id => {
        this.setState(({dishes, dish, editMode}) => ({
            dishes: dishes.filter(_dish => _dish.id !== id),
            // Check if editMode previously stored dish (in state) is equal to the selected dish
            // This is to prevent deleting a different dish, switching the currently selected state.dish editMode
            editMode: dish.id === id ? false : editMode,
            // Check if id previously stored dish (in state) is equal to the selected dish
            // This is to prevent deleting a different dish, switching the currently selected state.dish
            dish: dish.id === id ? {} : dish
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
                    allergies={this.state.allergyNames}
                    categories={this.state.categoryNames}
                    onDishCreate={this.handleDishCreate}
                    toggleShowAll={this.handleToggleShowAll}
                    showAll={showAll}
                    order={this.state.order}
                />

                {/*<Header allergies={this.state.allergies} categories={this.state.categories}*/}
                {/*onDishCreate={this.handleDishCreate}*/}
                {/*/>*/}

                <div style={{display: 'flex', alignItems: 'stretch', height: 'calc(100% - 64px - 48px)'}}>
                    <div style={{flexGrow: 1, width: '20%'}}>
                        <Menu allergies={this.categoryNames} categories={this.categoryNames} onSubmit={this.handleRequestBill}/>
                    </div>
                    <div style={{flexGrow: 2, width: '80%'}}>
                        <Content
                            dish={dish}
                            dishes={dishes}
                            cars={cars}
                            category={category}
                            editMode={editMode}
                            allergies={this.state.allergyNames}
                            //allergies={allergies}
                            onSelect={this.handleDishSelect}
                            onDelete={this.handleDishDelete}
                            onSelectEdit={this.handleSelectEdit}
                            onEdit={this.handleDishEdit}
                            onAddItem={this.handleAddItemToOrder}
                            onRemoveItem={this.handleRemoveItemFromOrder}
                            showAll={showAll}
                        />
                    </div>
                </div>

                <Footer
                    categories={this.state.categoryNames}
                    //categories={categories}
                    category={category}
                    onSelect={this.handleCategorySelect}
                    onSubmit={this.handleOrderSubmit}
                    isEmpty={(this.state.order.length === 0)}
                />
            </Fragment>
        );
    }
}
