import React, { Component } from 'react';
import './Background.css';

const api_key = "AIzaSyCjehMfVjXJHxGnb2CacNmVcp7EdRLj4Hc";
const url_places = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=" + api_key;
const url_photos = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=" + api_key + "&photoreference=";

console.log(navigator.geolocation)

class Background extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
        }

    };


    componentDidMount() {
        fetch(url_places
        ).then(results => {
            return results.json();
        }).then(data => {
            return data.results;
        }).then(results => {
            let pictures = results.map(place => {
                console.log(place.photos[0].photo_reference)
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
            console.log(this.state);
        });
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
