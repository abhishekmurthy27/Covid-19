import React from 'react';
import { Component } from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import LandingPage from './component/LandingPage'
import LoginPage from './component/LoginPage'

class App extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Router>
        <div className="component-app">
          <Switch>
            <Route path = "/" exact render = {(props) => <LoginPage/>}/>
            <Route path = "/homepage" exact render = { (props) => <LandingPage/>}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App