import React, { createContext, useContext, useState } from 'react';

interface User {
    email: string;
    token: string;
}

interface AuthContextState {
    user: User | null;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextState>({
    user: null,
    setUser: () => {},
});

type Props = {
    children?: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
