import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Navbar from './Navbar'
import { getCookie } from './Cookie';

const GuardedRoute = ({ component: Component, ...rest }) => {
    // <>
    //     <Navbar />
    //     <Route {...rest} render={(props) => (
    //         auth === true
    //             ? <Component {...props} />
    //             : <Redirect to='/' />
    //     )} />
    // </>
    return(
        <Route 
            {...rest} 
            render={(props) => (
                getCookie("usertoken") !== '' 
                ?
                <>
                    <Navbar/>
                    <Component {...props}/> 
                </>
                :
                <Redirect to = '/'/>
            )}
        />
    );
};

export default GuardedRoute;