// src/pages/RepaymentPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
  Text,
  NumberInput,
  NumberInputField,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Spinner,
  Select
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function RepaymentPage() {
  const [form, setForm] = useState({ amount: '', loanId: '' });
  const [loans, setLoans] = useState([]);
  const [repayments, setRepayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [userData, setUserData] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchLoans();
    fetchRepayments();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data } = await api.get('/users/dashboard');
      setUserData(data.user);
    } catch (err) {
      console.error('Failed to fetch user data:', err);
      toast({
        title: 'Error',
        description: 'Failed to load user data',
        status: 'error'
      });
    }
  };

  const fetchLoans = async () => {
    try {
      const { data } = await api.get('/loans');
      setLoans(data.filter(loan => loan.status === 'approved'));
    } catch (err) {
      console.error('Failed to fetch loans:', err);
    }
  };

  const fetchRepayments = async () => {
    try {
      const { data } = await api.get('/repayments');
      setRepayments(data);
    } catch (err) {
      console.error('Failed to fetch repayments:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.amount || parseFloat(form.amount) < 100) {
      toast({
        title: 'Invalid amount',
        description: 'Minimum repayment is ₦100',
        status: 'warning'
      });
      return;
    }

    if (!form.loanId) {
      toast({
        title: 'Select loan',
        description: 'Please select a loan to repay',
        status: 'warning'
      });
      return;
    }

    if (!userData) {
      toast({
        title: 'User data not loaded',
        description: 'Please refresh the page',
        status: 'error'
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/paystack/initialize-payment', {
        amount: parseFloat(form.amount),
        email: userData.email,
        membershipId: userData.membershipNumber,
        type: 'repayment',
        loanId: form.loanId
      });

      // Redirect to Paystack payment page
      window.location.href = data.url;
    } catch (err) {
      console.error('Payment error:', err);
      toast({ 
        title: 'Payment initialization failed', 
        description: err.response?.data?.msg || err.response?.data?.message || 'Please try again',
        status: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const getSelectedLoan = () => {
    return loans.find(loan => loan._id === form.loanId);
  };

  const selectedLoan = getSelectedLoan();

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>Loan Repayment</Heading>
          <Text color="gray.600">Make a payment towards your active loan</Text>
        </Box>

        {loadingData ? (
          <Spinner />
        ) : loans.length === 0 ? (
          <Box p={6} borderWidth="1px" borderRadius="lg" textAlign="center">
            <Text color="gray.500" mb={4}>No active loans to repay</Text>
            <Button colorScheme="blue" onClick={() => navigate('/apply-loan')}>
              Apply for Loan
            </Button>
          </Box>
        ) : (
          <>
            <Box borderWidth="1px" borderRadius="lg" p={6}>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel htmlFor="loan-select">Select Loan</FormLabel>
                    <Select
                      id="loan-select"
                      placeholder="Choose a loan to repay"
                      value={form.loanId}
                      onChange={(e) => setForm(s => ({ ...s, loanId: e.target.value }))}
                    >
                      {loans.map((loan) => (
                        <option key={loan._id} value={loan._id}>
                          Loan #{loan._id.slice(-6)} - ₦{loan.amount.toLocaleString()} 
                          {loan.remainingAmount ? ` (Balance: ₦${loan.remainingAmount.toLocaleString()})` : ''}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  {selectedLoan && (
                    <Box p={4} bg="blue.50" borderRadius="md">
                      <VStack align="stretch" spacing={2}>
                        <Text><strong>Loan Amount:</strong> ₦{selectedLoan.amount.toLocaleString()}</Text>
                        <Text><strong>Purpose:</strong> {selectedLoan.purpose}</Text>
                        <Text><strong>Duration:</strong> {selectedLoan.duration} months</Text>
                        {selectedLoan.remainingAmount && (
                          <Text><strong>Remaining Balance:</strong> ₦{selectedLoan.remainingAmount.toLocaleString()}</Text>
                        )}
                      </VStack>
                    </Box>
                  )}

                  <FormControl isRequired>
                    <FormLabel htmlFor="repayment-amount">Repayment Amount (₦)</FormLabel>
                    <NumberInput min={100}>
                      <NumberInputField
                        id="repayment-amount"
                        name="amount"
                        autoComplete="off"
                        value={form.amount}
                        onChange={(e) => setForm(s => ({ ...s, amount: e.target.value }))}
                        placeholder="Enter amount (min. ₦100)"
                      />
                    </NumberInput>
                    <Text fontSize="sm" color="gray.600" mt={1}>
                      You can make partial or full payment
                    </Text>
                  </FormControl>

                  <Button 
                    colorScheme="blue" 
                    type="submit" 
                    isLoading={loading} 
                    size="lg"
                    isDisabled={!userData || !form.loanId}
                  >
                    Proceed to Payment
                  </Button>
                </VStack>
              </form>
            </Box>

            <Box>
              <Heading size="md" mb={4}>Active Loans</Heading>
              <Box overflowX="auto" borderWidth="1px" borderRadius="lg">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Date Applied</Th>
                      <Th>Amount</Th>
                      <Th>Duration</Th>
                      <Th>Purpose</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {loans.map((loan) => (
                      <Tr key={loan._id}>
                        <Td>{new Date(loan.createdAt).toLocaleDateString()}</Td>
                        <Td>₦{loan.amount.toLocaleString()}</Td>
                        <Td>{loan.duration} months</Td>
                        <Td>{loan.purpose}</Td>
                        <Td>
                          <Badge colorScheme="green">
                            {loan.status}
                          </Badge>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Box>

            {repayments.length > 0 && (
              <Box>
                <Heading size="md" mb={4}>Repayment History</Heading>
                <Box overflowX="auto" borderWidth="1px" borderRadius="lg">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Date</Th>
                        <Th>Amount</Th>
                        <Th>Reference</Th>
                        <Th>Status</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {repayments.map((repayment) => (
                        <Tr key={repayment._id}>
                          <Td>{new Date(repayment.createdAt).toLocaleDateString()}</Td>
                          <Td>₦{repayment.amount.toLocaleString()}</Td>
                          <Td fontFamily="mono" fontSize="sm">{repayment.reference}</Td>
                          <Td>
                            <Badge 
                              colorScheme={
                                repayment.status === 'completed' ? 'green' : 
                                repayment.status === 'pending' ? 'yellow' : 
                                'red'
                              }
                            >
                              {repayment.status}
                            </Badge>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </Box>
            )}
          </>
        )}
      </VStack>
    </Container>
  );
}
