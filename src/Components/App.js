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
        car: {},
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

    componentWillMount() {
        this.fetchCarData();
        //this.fetchProductData();
        //this.fetchAllergyData();
        //this.fetchCategoryData();
    }

    fetchCarData() {
        fetch("http://localhost:9000/getAllCars")
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.cars.map(car => (
                {
                    make: car.make,
                    model: car.model,
                    mileage: car.mileage,
                    price: car.price,
                    created: car.created,
                    updated: car.updated,
                    image: car.image
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

    handleSubmitCar = car => {

        console.log("Fired");

        // let newCar = {
        //     id: "",
        //     make: car.make,
        //     model: car.model,
        //     mileage: car.mileage,
        //     price: car.price,
        //     image: car.image
        // };

        let newCar = {
            id: "",
            make: "Porsche",
            model: "911",
            mileage: 13437,
            price: 78500,
            image: "data:image/jpeg;base64,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"
        };

        fetch('http://localhost:9000/submitNewCar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: "",
                make: "Bugatti",
                model: "Chiron",
                mileage: 1337,
                price: 2500000,
                image: "https://assets.bugatti.com/fileadmin/_processed_/sei/p54/se-image-4799f9106491ebb58ca3351f6df5c44a.jpg"
            })
        });

        //this.fetchProductData();

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
                    //onDishCreate={this.handleSubmitCar}
                    onDishCreate={this.handleSubmitCar}
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
                    //onSubmit={this.handleOrderSubmit}
                    onSubmit={this.handleSubmitCar}
                    isEmpty={(this.state.order.length === 0)}
                />
            </Fragment>
        );
    }
}
