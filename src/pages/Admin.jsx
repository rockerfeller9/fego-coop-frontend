import React, { useEffect, useState } from 'react';
import {
  Box, Button, Spinner, Text, VStack, Heading, HStack, Badge, Checkbox, useToast, Alert, AlertIcon
} from '@chakra-ui/react';
import api from '../api';

export default function Admin() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bulkVerifying, setBulkVerifying] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => { 
    const token = localStorage.getItem('fegoToken');
    if (!token) {
      setError('No authentication token found. Please login.');
      setLoading(false);
      return;
    }
    loadPending(); 
  }, []);

  const loadPending = () => {
    setLoading(true);
    setError(null);
    console.log('🔍 Fetching pending users...');
    
    api.get('/admin/users/pending')  // token auto-attached by interceptor
      .then(r => {
        console.log('✅ Pending users response:', r.data);
        setPending(Array.isArray(r.data) ? r.data : []);
      })
      .catch(err => {
        console.error('❌ Failed to load pending users:', err);
        console.error('Response status:', err.response?.status);
        console.error('Response data:', err.response?.data);
        
        const errorMsg = err.response?.status === 403 
          ? 'Access denied. Admin privileges required.'
          : err.response?.status === 401
          ? 'Unauthorized. Please login again.'
          : err.response?.data?.error || 'Failed to load pending users';
        
        setError(errorMsg);
      })
      .finally(() => setLoading(false));
  };

  const bulkVerify = async () => {
    if (selectedIds.length === 0) {
      toast({ title: 'No users selected', status: 'warning', duration: 2000 });
      return;
    }
    setBulkVerifying(true);
    console.log('🔄 Bulk verifying users:', selectedIds);
    
    try {
      const res = await api.post('/admin/users/bulk-verify', { userIds: selectedIds });
      console.log('✅ Bulk verify response:', res.data);
      
      setPending(p => p.filter(u => !selectedIds.includes(u._id)));
      setSelectedIds([]);
      toast({ 
        title: `Verified ${res.data.modifiedCount} user(s)`, 
        status: 'success', 
        duration: 3000 
      });
    } catch (err) {
      console.error('❌ Bulk verify failed:', err.response?.data);
      setError(err.response?.data?.error || 'Bulk verify failed');
    } finally {
      setBulkVerifying(false);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const selectAll = () => setSelectedIds(pending.map(u => u._id));
  const deselectAll = () => setSelectedIds([]);

  if (loading) {
    return (
      <Box maxW="3xl" mx="auto" mt={12} p={6}>
        <Spinner size="xl" />
        <Text mt={4}>Loading admin panel...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box maxW="3xl" mx="auto" mt={12} p={6}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
        <Button mt={4} onClick={() => window.location.href = '/login'}>
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <Box maxW="3xl" mx="auto" mt={12} p={6} bg="white" rounded="md" shadow="md">
      <Heading size="md" mb={4}>Admin – Pending User Verifications</Heading>

      {pending.length > 0 && (
        <HStack mb={4} spacing={3}>
          <Button size="sm" onClick={selectAll}>Select All</Button>
          <Button size="sm" onClick={deselectAll}>Deselect All</Button>
          <Button
            size="sm"
            colorScheme="green"
            onClick={bulkVerify}
            isLoading={bulkVerifying}
            isDisabled={selectedIds.length === 0}
          >
            Approve Selected ({selectedIds.length})
          </Button>
        </HStack>
      )}

      {pending.length === 0 && (
        <Alert status="info">
          <AlertIcon />
          No pending users to verify.
        </Alert>
      )}

      <VStack align="stretch" spacing={4}>
        {pending.map(u => (
          <Box key={u._id} p={4} borderWidth="1px" rounded="md">
            <HStack justify="space-between" mb={2}>
              <HStack>
                <Checkbox
                  isChecked={selectedIds.includes(u._id)}
                  onChange={() => toggleSelect(u._id)}
                />
                <Text fontWeight="600">{u.fullName}</Text>
              </HStack>
              <Badge colorScheme="yellow">{u.membershipId}</Badge>
            </HStack>
            <Text fontSize="sm" color="gray.600">{u.email}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}