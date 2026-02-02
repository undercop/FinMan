import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // On page load, check if we have a token
        const token = localStorage.getItem('token');
        if (token) {
            api.get('/users/me')
                .then(res => setUser(res.data))
                .catch(() => localStorage.removeItem('token')) // Token expired?
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        // After login, fetch the user profile immediately
        const profileRes = await api.get('/users/me');
        setUser(profileRes.data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

   // inside your AuthProvider function...
   const refreshUser = async () => {
       try {
           const res = await api.get('/users/me');
           setUser(res.data); // This updates the global balance!
       } catch (err) {
           console.error("Failed to refresh user", err);
       }
   };

   // Update your return statement to include it
   return (
       <AuthContext.Provider value={{ user, login, logout, loading, refreshUser }}>
           {!loading && children}
       </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);