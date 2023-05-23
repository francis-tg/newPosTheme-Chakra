import {Box, Flex, Text, Badge, useColorModeValue} from "@chakra-ui/react";
import React from "react";

function CommandeItem() {
  const textColor = useColorModeValue("black", "black");
  return (
    <Box
      p={5}
      bg="gray.200"
      textColor={textColor}
      w="20%"
      minWidth={{base: "50%", md: "40%", xl: "20%", lg: "30%"}}
      rounded="md"
    >
      <Flex justifyContent="start" direction="column">
        <Flex justifyContent="space-between" pb={4}>
          <Text>TDV-5</Text>
          <Text>1800 F</Text>
        </Flex>

        <Flex justifyContent="space-between" pt={4}>
          <Text>3 Articles</Text>
          <Text>
            <Badge bg="orange.400">En cours</Badge>
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default CommandeItem;
