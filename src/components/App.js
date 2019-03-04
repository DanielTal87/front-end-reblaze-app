import React, { Component } from 'react';
import Authentication from './Authentication'
import Home from './Home';
import Error from './Error';
import { BrowserRouter, Route, Switch } from "react-router-dom";


class App extends Component {

    render()
    {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Authentication}/>
                    <Route path='/home' component={Home}/>
                    <Route component={Error}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
