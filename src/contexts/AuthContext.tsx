import React, { createContext, useContext, useState, ReactNode } from 'react';
import {User} from '../models/user';
import {IAuthContext} from '../types/auth.types';

export const AuthContext = createContext<IAuthContext>({
    isAuthenticated: false,
    currentUser: null,
    login: () => {},
    logout: () => {},
});

export function useAuth() {
    return useContext(AuthContext);
}

interface IAuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const login = () => {
        setIsAuthenticated(true);
        setCurrentUser({
            email: '', id: 0, password: '', role: '', username: ''
            /* дані користувача після входу */
        });
    };

    const logout = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
    );
};
