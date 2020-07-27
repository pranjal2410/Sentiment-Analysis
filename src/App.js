import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Charts from './components/Charts';
import { BrowserRouter, Route } from 'react-router-dom';


const App = () => {
  return (
    <div className='root'>'
      {/* <Charts /> */}
      <Dashboard />
       {/* <BrowserRouter>
          <Route exact path='/' component={Signup} />
          <Route path='/login' component={Login} />
      </BrowserRouter>  */}
    </div>
    
  );
}

export default App;
