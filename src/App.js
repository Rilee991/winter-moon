import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Model from './components/Model';
import Context from './Global/Context';
import Stories from './components/Stories';
import Create from './components/Create';
import Post from './components/Post';
import SideBar from './components/SideBar';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Context>
        <Navbar />
        <div className="container">
          <Route exact path="/">
            <Stories />
            <Create />
            <Post />
            <SideBar />
          </Route>
          <Model />
          <Route path="/profile">
            <Profile />
          </Route>
        </div>
      </Context>
    </Router>
  );
}

export default App;
