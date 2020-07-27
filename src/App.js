import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Charts from './components/Charts/Charts';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';


const App = () => {
  return (
    <div className='root'>'
      <Navbar />
      <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/charts' component={Charts} />
            {/* <Route exact path='/' component={Signup} />
            <Route path='/login' component={Login} /> */}
        </Switch>
      </BrowserRouter> 
    </div>
    
  );
}

export default App;
