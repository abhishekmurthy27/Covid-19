import React, { Component } from 'react';
import { withRouter   } from "react-router-dom";
import {Button} from 'reactstrap'

class Login extends Component{
    componentDidMount() {
        if (localStorage.getItem('login') === 'Y') {
            this.props.history.push("/homepage");
        }
    }
    handleClick = (event) => {
        var username = event.currentTarget.form.username.value;
        var password = event.currentTarget.form.password.value;
        if(username === ""){
            alert("Enter username")
            return
        }
        if(password === ""){
            alert("Enter password")
            return
        }
        localStorage.setItem('login','Y')
        this.props.history.push("/homepage");
    }
    render(){
        return(
            <div class="loginPage">
                <div class="d-flex justify-content-center h-100">
                        <div class="card">
                            <div class="card-header">
                                <h3>Sign In</h3>
                            </div>
                        <div class="card-body">
                            <form> 
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" class="form-control" name="username" placeholder="username"/>
                                </div>
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" class="form-control" name="password" placeholder="password"/>
                                </div>
                                <div class="form-group">
                                    <Button color="warning" className = "float-right login_btn" onClick={this.handleClick}>Submit</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const LoginPage = withRouter(Login)
export default LoginPage