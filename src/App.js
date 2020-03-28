import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Logo from "./Logo";
import Main from "./Components/Main";
import About from "./Components/About";
import Stats from "./Components/Stats";
import {Container} from "react-bootstrap";
import Header from "./Components/Header";
import SidebarNav from './Components/SidebarNav';
// import SideBarNav from "./Components/sideBarNav/SidebarNav"


import './App.css';

function App() {
  const[isOpen, setIsOpen] = useState(false);



  return (
    <div className="App">
      {/* <Logo className="logo"/> */}
      <Header isOpen={isOpen} onClick={()=>setIsOpen(true)} />
      <SidebarNav isOpen={isOpen} onClose={()=>setIsOpen(false)} />
      <Container>
      <Router>
  
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route path="/about" component={About}/>
          <Route path="/stats" component={Stats}/>
        </Switch>
      </Router>
      </Container>
    </div>
  );
}

export default App;
