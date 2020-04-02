import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from "./Components/Main";
import About from "./Components/About";
import Stats from "./Components/Stats";
import Quiz from "./Components/Quiz";
import {Container} from "react-bootstrap";
import MemoHeader from "./Components/Header";
import MemoSidebar from './Components/SidebarNav';
import MemoFooter from "./Components/Footer";
import './App.css';

function App() {
  const[isOpen, setIsOpen] = useState(false);


  return (
    <div className="App">
      <MemoHeader isOpen={isOpen} onClick={()=>setIsOpen(true)} />
      <MemoSidebar isOpen={isOpen} onClose={()=>setIsOpen(false)} />
      <Container className="container">
      <Router>
  
        <Switch>
          <Route exact path="/" component={Main} isOpen={isOpen}/>
          <Route path="/quiz" component={Quiz} />
          <Route path="/about" component={About}/>
          <Route path="/stats" component={Stats}/>
        </Switch>
      </Router>
      </Container>
      <MemoFooter />
    </div>
  );
}

export default App;
