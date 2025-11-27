import React, { useEffect, useState } from 'react';
import { Box, Spinner, Text, Heading } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';

export default function PaymentCallbackPage() {
  const [sp] = useSearchParams();
  const [status, setStatus] = useState('Verifying...');
  const reference = sp.get('reference');

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get(`/paystack/verify?reference=${reference}`);
        setStatus(res.data.status === 'success' ? 'Contribution successful' : 'Verification failed');
      } catch {
        setStatus('Verification error');
      }
    };
    if (reference) verify();
  }, [reference]);

  return (
    <Box maxW="md" mx="auto" mt={16} p={6} bg="white" rounded="md" shadow="md">
      <Heading size="md" mb={3}>Payment Status</Heading>
      <Text>{status}</Text>
      {!reference && <Text color="red.500" mt={2}>Missing reference.</Text>}
      {status === 'Verifying...' && <Spinner mt={4} />}
    </Box>
  );
}