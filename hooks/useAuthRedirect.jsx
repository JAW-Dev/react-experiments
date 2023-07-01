// hooks/useAuthRedirect.js
import { useContext, useEffect } from 'react';
import useAuth from '../context/AuthContext';

export default function useAuthRedirect() {
  const { isLoading, isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      window.location.href = '/users/sign_in';
    }
  }, [isLoading, isLoggedIn]);
}
