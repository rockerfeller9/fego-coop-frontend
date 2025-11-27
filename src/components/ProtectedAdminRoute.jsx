import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api';
import { Spinner, Flex } from '@chakra-ui/react';

export default function ProtectedAdminRoute({ children }) {
  const [allowed, setAllowed] = useState(null);
  const token = localStorage.getItem('fegoToken');

  useEffect(() => {
    if (!token) { setAllowed(false); return; }
    api.get('/users/profile', { headers: { 'x-auth-token': token } })
      .then(r => setAllowed(r.data.isAdmin === true))
      .catch(() => setAllowed(false));
  }, [token]);

  if (allowed === null) {
    return (
      <Flex justify="center" mt={16}>
        <Spinner />
      </Flex>
    );
  }

  return allowed ? children : <Navigate to="/dashboard" replace />;
}