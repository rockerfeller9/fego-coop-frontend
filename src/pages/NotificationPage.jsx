import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, Text, Spinner } from '@chakra-ui/react';
import { http } from '../lib/http';

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await http.get('/users/notifications');
        setNotifications(res.data);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <Box p={8} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={8} maxW="800px" mx="auto">
      <Heading size="lg" mb={6}>Notifications</Heading>
      <VStack spacing={4} align="stretch">
        {notifications.length === 0 ? (
          <Text>No notifications</Text>
        ) : (
          notifications.map((notif, index) => (
            <Box key={index} p={4} bg="gray.50" rounded="md">
              <Text>{notif.message}</Text>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
}