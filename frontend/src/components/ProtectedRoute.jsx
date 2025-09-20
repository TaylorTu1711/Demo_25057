import React from 'react';
import { Navigate, useLocation  } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  return isLoggedIn() ? children : <Navigate to="/login" state={{ from: location }} replace/>;
}