import React from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

export function EmptyState({ title = 'Nothing here yet', body = 'Come back later.', action }) {
  return (
    <Box textAlign="center" borderWidth="1px" borderRadius="lg" p={10}>
      <Heading size="md" mb={2}>{title}</Heading>
      <Text color="gray.600" mb={4}>{body}</Text>
      {action}
    </Box>
  );
}

export function ErrorState({ title = 'Something went wrong', body = 'Please try again.', onRetry }) {
  return (
    <Box textAlign="center" borderWidth="1px" borderRadius="lg" p={10}>
      <Heading size="md" mb={2} color="red.600">{title}</Heading>
      <Text color="gray.600" mb={4}>{body}</Text>
      {onRetry && <Button onClick={onRetry} colorScheme="brand">Retry</Button>}
    </Box>
  );
}