import React from 'react';
import { Box, Flex, Heading, Button, HStack, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('fegoToken');

  const handleLogout = () => {
    localStorage.removeItem('fegoToken');
    navigate('/login');
  };

  return (
    <Box as="nav" bg="white" boxShadow="sm" mb={8} py={3}>
      <Flex maxW="6xl" mx="auto" px={4} align="center" justify="space-between">
        <Heading as={RouterLink} to="/" size="md" color="blue.600">
          FEGO 02 Cooperative
        </Heading>
        <HStack spacing={4}>
          {token ? (
            <>
              <ChakraLink as={RouterLink} to="/dashboard" color="gray.600" _hover={{ color: 'blue.600' }}>
                Dashboard
              </ChakraLink>
              <ChakraLink as={RouterLink} to="/notifications" fontSize="lg">
                🔔
              </ChakraLink>
              <Button size="sm" colorScheme="blue" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button as={RouterLink} to="/login" variant="ghost" size="sm">
                Login
              </Button>
              <Button as={RouterLink} to="/register" colorScheme="blue" size="sm">
                Register
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}

// ...existing code...
