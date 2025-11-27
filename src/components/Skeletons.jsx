import React from 'react';
import { Box, Skeleton, SkeletonText, Stack } from '@chakra-ui/react';

export function CardSkeleton() {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={6}>
      <Skeleton height="20px" w="50%" mb={4} />
      <SkeletonText mt="4" noOfLines={4} spacing="3" />
    </Box>
  );
}

export function ListSkeleton({ count = 3 }) {
  return (
    <Stack spacing={4}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} height="56px" borderRadius="md" />
      ))}
    </Stack>
  );
}