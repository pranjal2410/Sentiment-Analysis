import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Route } from 'react-router-dom';


const App = () => {
  return (
    <Dashboard />
    // <BrowserRouter>
    //   <div className="main">
    //     <Route exact path='/' component={Signup} />
    //     <Route path='/login' component={Login} />
    //   </div>
    // </BrowserRouter>
  );
}

export default App;
