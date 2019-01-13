import React, {Component, Fragment} from "react";
import {CssBaseline} from "@material-ui/core";
import {Footer, Header} from "./Layouts";
import Content from "./Content/Content";
import Menu from "./Content/Menu";

// For testing only
export const add = (x, y) => {
    return x + y;
};

// Use localhost for local and herokuapp for deployed version
//const backendURL = "http://localhost:9000";
const backendURL = "https://autoscout23.herokuapp.com";

export default class extends Component {
    state = {
        cars: [],
        car: {},
        makes: [],
        makeNames: [],
        categoryNames: ['Sports Cars'],
        categories: [],
        editMode: false,
        isLoaded: false
    };

    componentWillMount() {
        this.fetchCarData();
        this.fetchMakeData();
    }

    fetchCarData = () => {
        fetch(backendURL + "/get-all-cars")
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.list.map(car => (
                {
                    id: car.carID,
                    make: car.make,
                    model: car.model,
                    carOwner: car.carOwner,
                    mileage: car.mileage,
                    price: car.price,
                    description: car.description,
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

    fetchCarOfMake = (make) => {
        fetch(backendURL + "/car-make/" + make)
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.list.map(car => (
                {
                    id: car.carID,
                    make: car.make,
                    model: car.model,
                    carOwner: car.carOwner,
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

    handleSubmitCar = car => {

        console.log("Fired");
        console.log(car);

        let newCar = {
            id: "",
            make: car.make,
            model: car.model,
            mileage: car.mileage,
            carOwner: car.carOwner,
            description: car.description,
            price: car.price,
            image: car.image
        };

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
                carOwner: car.carOwner,
                description: car.description,
                price: car.price,
                image: (car.image == null) ? "" : car.image
            })
        });

        console.log(newCar);

        this.setState(({cars}) => ({
            cars: [...cars, newCar]
        }));
    };

    handleCategorySelect = category => {
        this.setState({
            category
        });
    };

    handleCarDelete = id => {
        fetch(backendURL + "/car-delete/" + id, {
            method: 'DELETE'
        });

        this.setState(({cars, car, editMode}) => ({
            cars: cars.filter(_car => _car.id !== id),
            // Check if editMode previously stored car (in state) is equal to the selected car
            // This is to prevent deleting a different car, switching the currently selected state.car editMode
            editMode: car.id === id ? false : editMode,
            // Check if id previously stored car (in state) is equal to the selected car
            // This is to prevent deleting a different car, switching the currently selected state.car
            car: car.id === id ? {} : car
        }));
    };

    render() {
        const cars = this.state.cars,
            {category, editMode} = this.state;
        return (/*theme={darkTheme}*/
            <Fragment>
                {/*CssBaseline handles the different baseline css browsers have, to make it more consitant across multiple different browsers*/}
                <CssBaseline/>

                <Header
                    makes={this.state.makeNames}
                    categories={this.state.categoryNames}
                    onCarCreate={this.handleSubmitCar}
                    toggleShowAll={this.handleToggleShowAll}
                />
                <div style={{display: 'flex', alignItems: 'stretch', height: 'calc(100% - 64px - 48px)'}}>
                    <div style={{flexGrow: 1, width: '25%'}}>
                        <Menu makes={this.state.makeNames}
                              categories={this.categoryNames}
                              onSearch={this.fetchCarOfMake}
                              onResetFilter={this.fetchCarData}
                        />
                    </div>
                    <div style={{flexGrow: 2, width: '75%'}}>
                        <Content
                            cars={cars}
                            category={category}
                            editMode={editMode}
                            onSelect={this.handleCarSelect}
                            onDelete={this.handleCarDelete}
                        />
                    </div>
                </div>
                <Footer
                    categories={this.state.makeNames}
                    category={category}
                    onSelect={this.handleCategorySelect}
                    onSubmit={this.handleSubmitCar}
                    getCarByMake={this.fetchCarOfMake}
                />
            </Fragment>
        );
    }
}
