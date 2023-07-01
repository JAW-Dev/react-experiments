import React, { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { fetchUser } from '../helpers/apiCalls';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { data, isLoading } = useQuery('currentUser', fetchUser);

  return (
    <AuthContext.Provider
      value={{
        userData: data?.user,
        isLoading,
        isLoggedIn: !!data?.user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook to use the AuthContext, call it useAuth
function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
