import React, { useState, useEffect } from 'react';

import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Charts from './components/Charts';
import GuardedRoute from './components/GuardedRoute';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { getCookie } from './components/Cookie';


const App = () => {
  return (
    <div className='main'>      
      <BrowserRouter>
        <Switch>     
            <Route exact path='/' component={Login} />
            <Route path='/signup' component={Signup} />
            <GuardedRoute exact path='/dashboard' component={Dashboard}/>
            <GuardedRoute path='/dashboard/charts' component={Charts}/>
        </Switch>
      </BrowserRouter> 
    </div>
    
  );
}

export default App;
