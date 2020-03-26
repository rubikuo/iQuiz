import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Logo from "./Logo"
import Main from "./Components/main";
import About from "./Components/about";


// import './App.css';

function App() {
  return (
    <div className="App">
      <Logo />
      <Router>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route path="/about" component={About}/>
          <Route path="/stats" component={Stats}/>
        </Switch>
      </Router>

 
    </div>
  );
}

export default App;
