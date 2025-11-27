import React, { useState, useEffect } from 'react';
import {
  Container, Box, Heading, FormControl, FormLabel, Button, VStack, Select,
  Text, NumberInput, NumberInputField, Table, Thead, Tbody, Tr, Th, Td, Badge, Spinner, Alert, AlertIcon
} from '@chakra-ui/react';
import api from '../api';

const PAYSTACK_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

export default function ContributionPage() {
  const [form, setForm] = useState({ amount: '', type: 'monthly' });
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState(null);
  const [authError, setAuthError] = useState(false);

  useEffect(() => { fetchContributions(); fetchUserData(); }, []);

  useEffect(() => {
    if (!window.PaystackPop) {
      const s = document.createElement('script');
      s.src = 'https://js.paystack.co/v1/inline.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const { data } = await api.get('/users/profile');
      setUserEmail(data.email || data.user?.email || '');
    } catch (err) {
      if (err.response?.status === 401) setAuthError(true);
      console.error('User fetch failed', err);
    }
  };

  const fetchContributions = async () => {
    try {
      const { data } = await api.get('/contributions');
      setContributions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('History fetch failed', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const startPayment = async () => {
    setError(null);
    const numericAmount = Number(form.amount);
    if (!numericAmount || numericAmount < 100) return setError('Enter valid amount (>= 100)');
    if (!PAYSTACK_KEY) return setError('Missing Paystack key');
    if (!userEmail) return setError('User email not loaded');

    setLoading(true);
    try {
      const initRes = await api.post('/paystack/initialize-payment', {
        amount: numericAmount,
        type: form.type
      });
      const { url } = initRes.data;
      if (url) window.location.href = url;
      else setError('No authorization URL');
    } catch (e) {
      setError(e.response?.data?.msg || 'Payment init failed');
    } finally {
      setLoading(false);
    }
  };

  if (authError) {
    return (
      <Container py={10}>
        <Alert status="error" mb={4}>
          <AlertIcon /> Unauthorized. Please log in.
        </Alert>
        <Button onClick={() => (window.location.href = '/login')} colorScheme="blue">
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>Make Contribution</Heading>
          <Text color="gray.600">Contribute securely with Paystack</Text>
        </Box>

        <Box borderWidth="1px" borderRadius="lg" p={6}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Amount (₦)</FormLabel>
              <NumberInput min={100}>
                <NumberInputField
                  value={form.amount}
                  onChange={(e) => setForm(s => ({ ...s, amount: e.target.value }))}
                  placeholder="Enter amount (min ₦100)"
                />
              </NumberInput>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Contribution Type</FormLabel>
              <Select
                value={form.type}
                onChange={(e) => setForm(s => ({ ...s, type: e.target.value }))}
              >
                <option value="monthly">Monthly</option>
                <option value="voluntary">Voluntary</option>
              </Select>
            </FormControl>

            {error && <Text color="red.500" fontSize="sm">{error}</Text>}

            <Button
              colorScheme="blue"
              onClick={startPayment}
              isLoading={loading}
              size="lg"
              isDisabled={!PAYSTACK_KEY || !userEmail}
            >
              Proceed to Payment
            </Button>

            {!PAYSTACK_KEY && <Text color="red.500" fontSize="sm">Paystack key not configured</Text>}
          </VStack>
        </Box>

        <Box>
          <Heading size="md" mb={4}>Contribution History</Heading>
          {loadingHistory ? (
            <Spinner />
          ) : contributions.length === 0 ? (
            <Text color="gray.500">No contributions yet</Text>
          ) : (
            <Box overflowX="auto" borderWidth="1px" borderRadius="lg">
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Date</Th><Th>Amount</Th><Th>Type</Th><Th>Reference</Th><Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {contributions.map(c => (
                    <Tr key={c._id}>
                      <Td>{new Date(c.createdAt).toLocaleDateString()}</Td>
                      <Td>₦{Number(c.amount).toLocaleString()}</Td>
                      <Td textTransform="capitalize">{c.type}</Td>
                      <Td fontFamily="mono" fontSize="xs">{c.reference}</Td>
                      <Td>
                        <Badge colorScheme={
                          c.status === 'completed' ? 'green' :
                          c.status === 'pending' ? 'yellow' : 'red'
                        }>
                          {c.status}
                        </Badge>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </Box>
      </VStack>
    </Container>
  );
}