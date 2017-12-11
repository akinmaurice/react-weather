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
                log: 3.39467,
                lat: 6.45407
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
        this.setState({ status: null });
        event.preventDefault();
        // Function to get the City
        // Geo COde from Our JSON Object List
        let cityName = this.cityInput.value;
        // FInd the City Name from Our Json Objects
        const citySearch = CityJson.cities.find(item => item.name === cityName);
        if (!citySearch) {
            // No city Found! Do Something
            console.log('No city Found');
        }
        else {
            // Update the State with the New Geo Code
            const locationUpdate = {
                log: citySearch.lng,
                lat: citySearch.lat,
            }
            this.setState({ location: locationUpdate });
            //FInd the Weather of the New State
            const lat = this.state.location.lat;
            const lng = this.state.location.log;
            this.getWeather(lat, lng);
        }
    }
    getWeather(lat, lng) {
        //Find the Weather of the Default State
        let apiCall = this.apiUrl + "/" + lat + "/" + lng;
        console.log(apiCall);
        axios.get(apiCall)
            .then((response) => {
                const data = response.data;
                console.log(data);
                this.setState({ data: data });
                this.setState({ status: true });
            })
            .catch(error => {
                console.log(error);
            })
    }

    //Get Weather for Default State
    componentDidMount() {
        //Find the Weather of the Default State
        const lat = this.state.location.lat;
        const lng = this.state.location.log;
        this.getWeather(lat, lng);
    }

    // Render Method
    render() {
        const weatherData = this.state.data;
        let views = <Loading />
        if (this.state.status === true) {
            views = <Display details={weatherData} />;
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