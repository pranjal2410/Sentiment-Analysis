import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Navbar from './Navbar'

const GuardedRoute = ({ component: Component, auth, ...rest }) => (
    <>
        <Navbar />
        <Route {...rest} render={(props) => (
            auth === true
                ? <Component {...props} />
                : <Redirect to='/' />
        )} />
    </>
)

export default GuardedRoute;