import React, { Component } from 'react';
import './css/Home.css';
import Bar from './Bar';
import config from '../config';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
        }
        /*this.judgement = this.judgement.bind(this);
        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);*/

    };

    /*
    judgement(url, id, name, photo_url) {
        console.log(localStorage.getItem("uid"));
        const opts = JSON.stringify({
            "uid": localStorage.getItem("uid"),
            "id": id,
            "name": name,
            "photo_url": photo_url
        });

        fetch(url, {
            method: "POST",
            headers: config.headers,
            body: opts
        }).then(results => {
        }).catch(error => {
            console.log(error);
        })
    }

    like(id, name, photo_url) {
        const urlLike = "http://" + config.host + ":" + config.port + "/" + config.places.name + "/" + config.places.like;
        this.judgement(urlLike, id, name, photo_url);
    }

    dislike(id, name, photo_url) {
        const urlDislike = "http://" + config.host + ":" +
            config.port + "/" +
            config.places.name + "/" +
            config.places.dislike;
        this.judgement(urlDislike, id, name, photo_url);
    }*/

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
                        <img src={place.photo_url} alt={place.name} height="300" width="300"/>
                        <div align="center">
                            <button className="dislike" >dislike</button>
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
                <Bar />
                {this.state.pictures}
            </div>
        )
    }
}

export default Home;
