import React, { Component } from 'react';
import './Background.css';


const api_key = "AIzaSyCjehMfVjXJHxGnb2CacNmVcp7EdRLj4Hc";
const url_places = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
    "radius=2000&type=restaurant&key=" + api_key + "&location=";
const url_photos = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=" + api_key + "&photoreference=";


class Background extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
        }

    };


    display_places(position) {
        fetch(url_places + position.coords.latitude + "," + position.coords.longitude
        ).then(results => {
            return results.json();
        }).then(data => {
            return data.results;
        }).then(results => {
            let pictures = results.map(place => {
                return (
                    <div className="img" key={place.id}>
                        <p>{place.name}</p>
                        <img src={url_photos + place.photos[0].photo_reference} alt={place.name} height="300" width="300"/>
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

export default Background;
