import React, { Component } from 'react';
import axios from 'axios';
import Display from './Display';
import Loading from './Loading';
import CityJson from '../db/cities.json';


class Search extends Component {
    constructor() {
        super();
        this.state = {
            status: false,
            data: {},
            location: {
                city: 'Lagos',
                country: 'NG'
            }
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.getWeather = this.getWeather.bind(this);
        this.apiUrl = 'https://akinweather.herokuapp.com/api';
    }

    // Update the State when the form is submitted
    onSubmit(event) {
        this.setState({ location: {} });
        this.setState({ data: {} });
        this.setState({ status: false });
        event.preventDefault();
        // Function to get the City
        // Geo COde from Our JSON Object List
        let str = this.cityInput.value;
        str = str.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase());
        let cityName = str;
        // FInd the City Name from Our Json Objects
        const citySearch = CityJson.cities.find(item => item.name === cityName);
        if (!citySearch) {
            // No city Found! Do Something
            this.setState({ status: 'null' });
        }
        else {
            const newLocation = {
                city: citySearch.name,
                country: citySearch.country,
            };
            this.setState({location: newLocation, status: true});
            this.getWeather(citySearch.lat, citySearch.lng);
        }
    }
    // GET WEATHER METHOD
    getWeather(lat, lng) {
        //Find the Weather of the Default State
        let apiCall = this.apiUrl + "/" + lat + "/" + lng;
        console.log(apiCall);
        axios.get(apiCall)
            .then((response) => {
                const dataResponse = response.data;
                this.setState({ data: dataResponse });
                this.setState({ status: true });
            })
            .catch(error => {
                console.log(error);
            })
    }

    //Get Weather for Default State
    componentDidMount() {
        //Find the Weather of the Default State
        const lat = 6.45407;
        const lng = 3.39467;
        this.getWeather(lat, lng);
    }

    // Render Method
    render() {
        const weatherData = this.state.data;
        const locationData = this.state.location;
        let views = <Loading />
        if (this.state.status === true) {
            views = <Display details={weatherData} location={locationData} />;
        }
        else if (this.state.status === 'null') {
            views = <div>Could not find the weather for that city</div>
        }
        return (
            <div>
                <div className="row text-center justify-content-center align-items-center">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group" id="prefetch">
                            <input type="text" name="city" className="form-control-lg" placeholder="Search by city" ref={(input) => { this.cityInput = input }} />
                        </div>
                    </form>
                </div>
                <br />
                {views}
            </div>
        );
    }
}

export default Search;