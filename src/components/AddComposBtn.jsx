import {GridItem, Box, Text, Flex, Divider, Icon} from "@chakra-ui/react";
import React from "react";
import {FaPlusCircle} from "react-icons/fa";

function AddComposBtn({onClick}) {
  return (
    <GridItem bg="teal.100" py={2} rounded="md" onClick={onClick}>
      <Box cursor="pointer">
        <Flex
          justifyContent="center"
          alignItems="center"
          p={5}
          direction="column"
          color="black"
        >
          <Icon as={FaPlusCircle} fontSize={50} />
          <Text>Créer une composition</Text>
        </Flex>
      </Box>
    </GridItem>
  );
}

export default AddComposBtn;
