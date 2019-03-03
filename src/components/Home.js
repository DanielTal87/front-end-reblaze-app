import React, { Component } from 'react';
import './css/Home.css';
import config from '../config';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
        }

    };


    display_places(position) {
        const urlPlaces = "http://" + config.host + ":" + config.port + "/" + config.places.name;
        const opts = JSON.stringify({
            "latitude": position.coords.latitude,
            "longitude": position.coords.longitude
        });


        fetch(urlPlaces, {
                method: "POST",
                headers: config.headers,
                body: opts
            }
        ).then(results => {
            return results.json();
        }).then(data => {
            let pictures = data.map(place => {
                return (
                    <div className="img" key={place.id}>
                        <p>{place.name}</p>
                        <img src={place.photo_ref} alt={place.name} height="300" width="300"/>
                        <div align="center">
                            <button className="dislike">dislike</button>
                            <button className="like">like</button>
                        </div>
                    </div>
                )
            });
            this.setState({pictures: pictures});
        });
    }

    componentWillMount() {
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
               this.display_places(position);
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.pictures}
            </div>
        )
    }
}

export default Home;
