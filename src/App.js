import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Charts from './components/Charts/Charts';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';


const App = () => {
  return (
    <div className='main'>      
      <BrowserRouter>
        <Switch>     
            <Route exact path='/' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route 
              path='/dashboard' 
              component={() => {
                return(
                  <>
                    <Navbar/>
                    <Switch>
                      <Route exact path='/dashboard' component={Dashboard}/>
                      <Route path='/dashboard/charts' component={Charts}/>
                    </Switch>
                  </>
                );
              }}
            />
        </Switch>
      </BrowserRouter> 
    </div>
    
  );
}

export default App;
