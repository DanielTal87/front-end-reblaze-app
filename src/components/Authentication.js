import React, { Component } from 'react';
import config from "../config";

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.updateEmailValue = this.updateEmailValue.bind(this);
        this.updatePasswordValue = this.updatePasswordValue.bind(this);
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
    };



    sign(action) {

        const url = "http://" + config.host + ":" + config.port + "/" + config.auth.name + "/" + action;
        const opts = JSON.stringify({
            "email": this.state.emailValue,
            "password": this.state.passwordValue
        });

        fetch(url, {
            method: "POST",
            headers: config.headers,
            body: opts
            }
        ).then(results => {
            return results.json();
        }).then(data => {
            if (data.code !== undefined) {
                this.setState({error: data.message});
            } else {
                this.setState({error: ""});
                this.props.history.push("/home");
            }
        }).catch(error => {
            console.log(error)
        })
    }

    signUp () {
        this.sign(config.auth.signUp);
    }

    signIn () {
        this.sign(config.auth.signIn);
    }


    render() {
        return (
            <div className="inner-container">
                <div className="box">

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="email" className="login-input" placeholder="Email"
                                onChange={this.updateEmailValue}/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="login-input" placeholder="Password"
                                onChange={this.updatePasswordValue}/>
                    </div>

                    <button onClick={this.signUp}>Sign Up</button>
                    <button onClick={this.signIn}>Sign In</button>
                </div>
                <p style={{color:"red"}}>{this.state.error}</p>
            </div>
        );
    }

    updateEmailValue(evt) {
        this.setState({
            emailValue: evt.target.value
        });
    }

    updatePasswordValue(evt) {
        this.setState({
            passwordValue: evt.target.value
        });
    }

}

export default Authentication;
