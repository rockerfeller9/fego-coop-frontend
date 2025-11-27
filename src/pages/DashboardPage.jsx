import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Button, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { http } from '../lib/http'; // Changed from axiosInstance

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await http.get('/users/me'); // Removed /api prefix
        console.log('Profile loaded:', res.data);
        setUser(res.data);
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError('Failed to load profile');
        if (err.response?.status === 401) {
          localStorage.removeItem('fegoToken');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('fegoToken');
    localStorage.removeItem('role');
    navigate('/login');
  };

  if (loading) {
    return (
      <Box p={8} textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Loading...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={8}>
        <Text color="red.500" fontSize="lg">{error}</Text>
        <Button onClick={() => navigate('/login')} mt={4}>
          Back to Login
        </Button>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box p={8}>
        <Text>No user data available</Text>
        <Button onClick={handleLogout} mt={4}>Logout</Button>
      </Box>
    );
  }

  return (
    <Box p={8} maxW="800px" mx="auto">
      <VStack spacing={6} align="stretch">
        <Heading size="lg">Dashboard</Heading>
        
        <Box p={6} bg="gray.50" rounded="md" shadow="sm">
          <VStack spacing={3} align="stretch">
            <Text fontSize="xl" fontWeight="bold">
              Welcome, {user.firstName} {user.lastName}!
            </Text>
            <Text>
              <strong>Email:</strong> {user.email}
            </Text>
            <Text>
              <strong>Membership ID:</strong> {user.membershipId}
            </Text>
            <Text>
              <strong>Role:</strong> {user.role}
            </Text>
            <Text>
              <strong>Status:</strong> {user.isActive ? 'Active' : 'Inactive'}
            </Text>
          </VStack>
        </Box>

        <Button 
          onClick={handleLogout} 
          colorScheme="red" 
          size="lg"
          maxW="200px"
        >
          Logout
        </Button>
      </VStack>
    </Box>
  );
}
