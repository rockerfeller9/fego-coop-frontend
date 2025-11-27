import React, { useEffect, useState } from 'react';
import {
  Box, Button, Spinner, Text, VStack, Heading, HStack, Badge, Checkbox, useToast
} from '@chakra-ui/react';
import api from '../api';

export default function AdminVerifyUsers() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState(null);
  const [bulkVerifying, setBulkVerifying] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [error, setError] = useState(null);
  const toast = useToast();

  const token = localStorage.getItem('fegoToken');
  const cfg = { headers: { 'x-auth-token': token } };

  useEffect(() => {
    loadPending();
  }, []);

  const loadPending = () => {
    setLoading(true);
    api.get('/admin/users/pending', cfg)
      .then(r => setPending(r.data))
      .catch(err => setError(err.response?.data?.error || 'Failed to load'))
      .finally(() => setLoading(false));
  };

  const verify = async (id) => {
    setVerifyingId(id);
    try {
      await api.patch(`/admin/users/${id}/verify`, {}, cfg);
      setPending(p => p.filter(u => u._id !== id));
      setSelectedIds(s => s.filter(sid => sid !== id));
      toast({ title: 'User verified', status: 'success', duration: 2000 });
    } catch (err) {
      setError(err.response?.data?.error || 'Verify failed');
    } finally {
      setVerifyingId(null);
    }
  };

  const bulkVerify = async () => {
    if (selectedIds.length === 0) {
      toast({ title: 'No users selected', status: 'warning', duration: 2000 });
      return;
    }
    setBulkVerifying(true);
    try {
      const res = await api.post('/admin/users/bulk-verify', { userIds: selectedIds }, cfg);
      setPending(p => p.filter(u => !selectedIds.includes(u._id)));
      setSelectedIds([]);
      toast({ title: `Verified ${res.data.modifiedCount} users`, status: 'success', duration: 3000 });
    } catch (err) {
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

  if (loading) return <Spinner mt={8} />;

  return (
    <Box maxW="3xl" mx="auto" mt={12} p={6} bg="white" rounded="md" shadow="md">
      <Heading size="md" mb={4}>Pending User Verifications</Heading>
      {error && <Text color="red.500" mb={3}>{error}</Text>}

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

      {pending.length === 0 && <Text>No pending users.</Text>}

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
            <Button
              mt={3}
              size="sm"
              colorScheme="green"
              onClick={() => verify(u._id)}
              isLoading={verifyingId === u._id}
            >
              Approve
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}