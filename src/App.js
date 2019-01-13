import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch } from 'react-router-dom';
import Camera from './Pages/Camera/Camera';
import Home from './Pages/Home/Home';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/camera" component={Camera}></Route>
        </Switch>>
      </div>
    );
  }
}

export default App;
