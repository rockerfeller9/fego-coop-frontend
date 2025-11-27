import React from 'react';
import {
  Box, Container, SimpleGrid, Heading, Text, Button, Stack, Image, HStack, Icon
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

export default function Hero() {
  return (
    <Box as="header" py={{ base: 10, md: 16 }} bg="white">
      <Container maxW="6xl">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 10 }} alignItems="center">
          <Stack spacing={5}>
            <Heading as="h1" size="2xl" lineHeight="1.1">
              Financial empowerment for FEGO members
            </Heading>
            <Text color="gray.600" fontSize={{ base: 'md', md: 'lg' }}>
              Access transparent loans, manage savings, and track projects—all in one secure portal.
            </Text>
            <HStack spacing={4} color="gray.600">
              <HStack><Icon as={CheckCircleIcon} color="brand.600" /><Text>Low, transparent rates</Text></HStack>
              <HStack><Icon as={CheckCircleIcon} color="brand.600" /><Text>Secure member data</Text></HStack>
            </HStack>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={3}>
              <Button as="a" href="/register" colorScheme="brand" size="md">Get Started</Button>
              <Button as="a" href="/login" variant="outline" colorScheme="brand" size="md">I already have an account</Button>
            </Stack>
          </Stack>
          <Box>
            <Image
              src="/hero-illustration.png"
              alt="Members managing savings and loans"
              borderRadius="xl"
              shadow="lg"
            />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}