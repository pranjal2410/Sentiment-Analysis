import React, { useState, useEffect } from 'react';

import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Charts from './components/Charts';
import GuardedRoute from './components/GuardedRoute';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { getCookie } from './components/Cookie';


const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const dummy = null
  useEffect(() => {
    if(getCookie("usertoken") !== '') {
      setIsAuth(true);
    }
  }, [dummy])
  return (
    <div className='main'>      
      <BrowserRouter>
        <Switch>     
            <Route exact path='/' component={Login} />
            <Route path='/signup' component={Signup} />
            isAuth ?
            <GuardedRoute path='/dashboard' component={Dashboard} auth={isAuth} />
            <GuardedRoute path='/dashboard/charts' component={Charts} auth={isAuth} />
            :
            null
            
        </Switch>
      </BrowserRouter> 
    </div>
    
  );
}

export default App;
