// src/pages/ProjectInvestmentPage.jsx
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
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  Spinner
} from '@chakra-ui/react';
import { http } from '../lib/http'; // Ensure this path is correct

export default function ProjectInvestmentPage() {
  const [form, setForm] = useState({
    projectName: '',
    amount: '',
    duration: '',
    expectedReturn: ''
  });
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingInvestments, setLoadingInvestments] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const { data } = await http.get('/investments'); // Updated to use http
      setInvestments(data);
    } catch (err) {
      console.error('Failed to fetch investments:', err);
    } finally {
      setLoadingInvestments(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await http.post('/investments', { // Updated to use http
        projectName: form.projectName,
        amount: parseFloat(form.amount),
        duration: parseInt(form.duration),
        expectedReturn: parseFloat(form.expectedReturn)
      });
      toast({ 
        title: 'Investment successful', 
        description: 'Your investment has been recorded',
        status: 'success' 
      });
      setForm({ projectName: '', amount: '', duration: '', expectedReturn: '' });
      fetchInvestments();
    } catch (err) {
      toast({ 
        title: 'Investment failed', 
        description: err.response?.data?.message || 'Please try again',
        status: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>Invest in Projects</Heading>
          <Text color="gray.600">Grow your wealth through cooperative projects</Text>
        </Box>

        <Box borderWidth="1px" borderRadius="lg" p={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel htmlFor="project-name">Project Name</FormLabel>
                <Input
                  name="projectName"
                  id="project-name"
                  autoComplete="off"
                  value={form.projectName}
                  onChange={(e) => setForm(s => ({ ...s, projectName: e.target.value }))}
                  placeholder="Enter project name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="investment-amount">Investment Amount (₦)</FormLabel>
                <NumberInput min={5000}>
                  <NumberInputField
                    name="amount"
                    id="investment-amount"
                    autoComplete="off"
                    value={form.amount}
                    onChange={(e) => setForm(s => ({ ...s, amount: e.target.value }))}
                    placeholder="Enter amount"
                  />
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="investment-duration">Duration (months)</FormLabel>
                <NumberInput min={1} max={60}>
                  <NumberInputField
                    name="duration"
                    id="investment-duration"
                    autoComplete="off"
                    value={form.duration}
                    onChange={(e) => setForm(s => ({ ...s, duration: e.target.value }))}
                    placeholder="Investment duration"
                  />
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="expected-return">Expected Return (%)</FormLabel>
                <NumberInput min={0} max={100} precision={2}>
                  <NumberInputField
                    name="expectedReturn"
                    id="expected-return"
                    autoComplete="off"
                    value={form.expectedReturn}
                    onChange={(e) => setForm(s => ({ ...s, expectedReturn: e.target.value }))}
                    placeholder="Expected return percentage"
                  />
                </NumberInput>
              </FormControl>

              {form.amount && form.expectedReturn && (
                <Box p={4} bg="green.50" borderRadius="md">
                  <Text>
                    <strong>Projected Return:</strong> ₦
                    {(parseFloat(form.amount) * (1 + parseFloat(form.expectedReturn) / 100)).toLocaleString()}
                  </Text>
                </Box>
              )}

              <Button colorScheme="blue" type="submit" isLoading={loading} size="lg">
                Invest Now
              </Button>
            </VStack>
          </form>
        </Box>

        <Box>
          <Heading size="md" mb={4}>Your Investments</Heading>
          {loadingInvestments ? (
            <Spinner />
          ) : investments.length === 0 ? (
            <Text color="gray.500">No investments yet</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {investments.map((investment) => (
                <Box key={investment._id} p={6} borderWidth="1px" borderRadius="lg">
                  <VStack align="stretch" spacing={2}>
                    <Heading size="sm">{investment.projectName}</Heading>
                    <Stat>
                      <StatLabel>Investment Amount</StatLabel>
                      <StatNumber>₦{investment.amount.toLocaleString()}</StatNumber>
                      <StatHelpText>
                        {investment.duration} months • {investment.expectedReturn}% return
                      </StatHelpText>
                    </Stat>
                    <Badge colorScheme={investment.status === 'active' ? 'green' : 'gray'}>
                      {investment.status}
                    </Badge>
                    <Text fontSize="sm" color="gray.600">
                      Started: {new Date(investment.createdAt).toLocaleDateString()}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </VStack>
    </Container>
  );
}
