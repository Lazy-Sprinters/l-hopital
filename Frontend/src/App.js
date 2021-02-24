import React from 'react';
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import CenterRegister from './components/CenterRegister';
import Verify from './components/Verify';
import Login from './components/Login';
import CenterLogin from './components/CenterLogin';
import LoginHome from './components/LoginHome';
import Tests from './components/Tests';
import Profile from './components/Profile';
import selectionPage1 from './components/selectionPage1';
import selectionPage2 from './components/selectionPage2';
import { BrowserRouter as Router, Switch, Route, HashRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <HashRouter basename='/'>
        <Switch>
          <Route path='/' exact  render ={()=> < Home />} /> />
          <Route path='/register' exact  render ={()=> < Register />} />
          <Route path='/centerRegister' exact  render ={()=> < CenterRegister />} />
          <Route path='/verify' exact  render ={()=> < Verify />} />
          <Route path='/login' exact  render ={()=> < Login />} />
          <Route path='/centerLogin' exact  render ={()=> < CenterLogin />} />
          <Route path='/loginHome' exact  render ={()=> < LoginHome />} />
          <Route path='/test' exact  render ={()=> < Tests />} />
          <Route path='/profile' exact  render ={()=> < Profile />} />
          <Route path='/selectionPage1' exact  render ={()=> < selectionPage1 />} />
          <Route path='/selectionPage2' exact  render ={()=> < selectionPage2 />} />
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;