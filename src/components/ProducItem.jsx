import {Box, Divider, Flex, GridItem, Text} from "@chakra-ui/react";
import React from "react";

function ProducItem() {
  return (
    <GridItem bg="green.400" p={5} rounded="md">
      <Box>
        <Text fontSize={{base: "md", xl: "lg"}} fontWeight="bold">
          DOPEL MUNICH
        </Text>
        <Flex mb={2} mt={2}>
          <Text fontSize={{base: "md", xl: "lg"}}>Prix:</Text>
          <Text fontSize={{base: "md", xl: "lg"}} fontWeight="bold">
            1000 F
          </Text>
        </Flex>
        <Divider />
        <Flex>
          <Text>Quantité: 2</Text>
        </Flex>
      </Box>
    </GridItem>
  );
}

export default ProducItem;
