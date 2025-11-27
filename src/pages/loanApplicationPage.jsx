// src/pages/LoanApplicationPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
  Select,
  Text,
  NumberInput,
  NumberInputField
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { http } from '../lib/http'; // Ensure this path is correct

export default function LoanApplicationPage() {
  const [form, setForm] = useState({
    amount: '',
    duration: '',
    purpose: ''
  });
  const [loading, setLoading] = useState(false);
  const [membershipId, setMembershipId] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('fegoToken');
      if (!token) return;

      try {
        const res = await http.get('/users/profile', {
          headers: { 'x-auth-token': token }
        });
        setMembershipId(res.data.membershipId || '');
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('fegoToken');
      await http.post('/loans/apply', {
        membershipId,
        amountRequested: parseFloat(form.amount),
        purpose: form.purpose,
        repaymentPeriod: parseInt(form.duration)
      }, {
        headers: { 'x-auth-token': token }
      });
      toast({ 
        title: 'Loan application submitted', 
        description: 'Your application is under review',
        status: 'success' 
      });
      navigate('/dashboard');
    } catch (err) {
      toast({ 
        title: 'Application failed', 
        description: err.response?.data?.message || 'Please try again',
        status: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const interestRate = 5;
  const calculatedTotal = form.amount ? parseFloat(form.amount) * (1 + interestRate / 100) : 0;
  const monthlyPayment = form.amount && form.duration ? calculatedTotal / parseInt(form.duration) : 0;

  return (
    <Container maxW="2xl" py={8}>
      <Box mb={6}>
        <Heading size="lg" mb={2}>Apply for Loan</Heading>
        <Text color="gray.600">Fill out the form below to apply for a loan</Text>
      </Box>

      <Box as="form" onSubmit={handleSubmit} borderWidth="1px" borderRadius="lg" p={6}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel htmlFor="loan-amount">Loan Amount (₦)</FormLabel>
            <NumberInput min={1000}>
              <NumberInputField
                name="amount"
                id="loan-amount"
                autoComplete="off"
                value={form.amount}
                onChange={(e) => setForm(s => ({ ...s, amount: e.target.value }))}
                placeholder="Enter amount"
              />
            </NumberInput>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="loan-duration">Duration (months)</FormLabel>
            <Select
              name="duration"
              id="loan-duration"
              autoComplete="off"
              value={form.duration}
              onChange={(e) => setForm(s => ({ ...s, duration: e.target.value }))}
              placeholder="Select duration"
            >
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="18">18 months</option>
              <option value="24">24 months</option>
              <option value="36">36 months</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="loan-purpose">Purpose of Loan</FormLabel>
            <Textarea
              name="purpose"
              id="loan-purpose"
              autoComplete="off"
              value={form.purpose}
              onChange={(e) => setForm(s => ({ ...s, purpose: e.target.value }))}
              placeholder="Describe why you need this loan"
              rows={4}
            />
          </FormControl>

          {form.amount && form.duration && (
            <Box p={4} bg="blue.50" borderRadius="md">
              <VStack align="stretch" spacing={2}>
                <Text><strong>Interest Rate:</strong> {interestRate}%</Text>
                <Text><strong>Total Repayment:</strong> ₦{calculatedTotal.toLocaleString()}</Text>
                <Text><strong>Monthly Payment:</strong> ₦{monthlyPayment.toLocaleString()}</Text>
              </VStack>
            </Box>
          )}

          <Button colorScheme="blue" type="submit" isLoading={loading} size="lg">
            Submit Application
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}
