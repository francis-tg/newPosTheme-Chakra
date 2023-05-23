import {Box, Flex, Heading} from "@chakra-ui/react";
import React from "react";

function CommandeContainer({children}) {
  return (
    <Box p={3} w="100%">
      <Heading size="md" mb={2}>
        Commande
      </Heading>
      <Flex
        justifyContent="flex-start"
        alignItems="center"
        flexGrow={2}
        flexShrink={3}
        wrap="nowrap"
        gap={2}
        overflowX="auto"
        overflowY="hidden"
      >
        {children}
      </Flex>
    </Box>
  );
}

export default CommandeContainer;
