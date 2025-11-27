// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { http } from '../lib/http'; // Ensure this path is correct

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    fullName: '',
    membershipId: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await http.post('/users/register', { // Changed from /api/users/register
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        fullName: form.fullName.trim(),
        membershipId: form.membershipId.trim()
      });
      if (res.status === 201) {
        navigate('/login');
      } else {
        setError('Unexpected response');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={16} p={6} bg="white" rounded="md" shadow="md">
      <Heading size="md" mb={4}>Register</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Input name="username" placeholder="Username" value={form.username} onChange={onChange} required />
          <Input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
          <Input name="fullName" placeholder="Full Name" value={form.fullName} onChange={onChange} required />
          <Input name="membershipId" placeholder="Membership ID" value={form.membershipId} onChange={onChange} required />
          <Input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
          {error && <Text color="red.500" fontSize="sm">{error}</Text>}
          <Button type="submit" colorScheme="green" isLoading={loading}>Create Account</Button>
        </VStack>
      </form>
    </Box>
  );
}
