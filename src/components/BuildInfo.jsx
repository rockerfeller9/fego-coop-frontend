import React from 'react';
import { Text } from '@chakra-ui/react';

export default function BuildInfo() {
  const hash = process.env.REACT_APP_BUILD_HASH || import.meta?.env?.VITE_BUILD_HASH;
  const time = process.env.REACT_APP_BUILD_TIME || import.meta?.env?.VITE_BUILD_TIME;
  if (!hash) return null;
  return (
    <Text fontSize="xs" color="gray.500" textAlign="right" px={4}>
      build {hash} • {time}
    </Text>
  );
}