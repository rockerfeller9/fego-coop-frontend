// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Box, Button, Input, VStack, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { http } from '../lib/http';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      console.log('Login POST -> /users/login');
      const res = await http.post('/users/login', { // Removed /api prefix
        email: identifier,
        password
      });
      const { token } = res.data;
      if (!token) throw new Error('Token missing');
      localStorage.setItem('fegoToken', token);
      console.log('Token saved:', token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      console.error('Response:', err.response?.data);
      setError(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={16} p={6} bg="white" rounded="md" shadow="md">
      <Heading size="md" mb={4}>Login</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Input
            placeholder="Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Text color="red.500" fontSize="sm">{error}</Text>}
          <Button type="submit" colorScheme="blue" isLoading={loading}>
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
