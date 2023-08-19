import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

function Error500() {
  return (
    <Box textAlign="center" mt={20}>
      <Heading as="h1" size="xl" mb={4}>
        500 Internal Server Error
      </Heading>
      <Text fontSize="lg">Oops! Something went wrong on our end.</Text>
    </Box>
  );
}

export default Error500;
