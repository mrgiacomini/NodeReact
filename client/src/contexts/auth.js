import React, {createContext, useState, useEffect, useContext} from 'react';
import { isAuth, authenticate, signout } from '../helpers/auth';

const AuthContext = createContext({});

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(isAuth());
    },[]);

    function login(data, next) {
        authenticate(data, (response) => {
            setUser(response);
            next(response);
        });
    }

    function logout() {
        signout();
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider.');
    }

    return context;
}

export {AuthProvider, useAuth};