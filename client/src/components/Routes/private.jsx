import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../../helpers/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const renderComponent = (Component, props) => {
        if (props.location.pathname === '/pagamentos' && !props.location.client )
            return (
                <Redirect
                    to={{
                        pathname: '/',
                        state: { from: props.location }
                    }}
                />
            );
        
        else
            return <Component {...props}/>;
    }

    return (
    <Route
        {...rest}
        render={props =>
            isAuth() ? (
                renderComponent(Component, props)                
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )
        }
    ></Route>
)};

export default PrivateRoute;