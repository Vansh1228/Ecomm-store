import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ children, token, ...rest }) {
    return token ? (
        <Route {...rest} element={children} />
      ) : (
        <Navigate to="/login" />
      );
}

export default PrivateRoute; 