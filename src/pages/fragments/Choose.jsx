import {Box, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import React from "react";
import {useDispatch} from "react-redux";
import {setType} from "../../redux/features/order";

function Choose() {
  const textColor = useColorModeValue("black", "black");
  const dispatch = useDispatch();
  function onChosse(type) {
    return dispatch(setType(type));
  }
  return (
    <Box width="100%" height="100%">
      <Flex
        gap={5}
        justifyContent="center"
        textColor={textColor}
        alignItems="center"
        mt={300}
        ml={5}
        mr={10}
      >
        <Box
          bg="orange.300"
          p={10}
          rounded="lg"
          cursor="pointer"
          onClick={() => onChosse("new")}
        >
          <Text fontSize="x-large">Nouvelle Commande</Text>
        </Box>
        <Box
          bg="orange.300"
          p={10}
          textColor={textColor}
          rounded="lg"
          cursor="pointer"
          onClick={() => onChosse("edit")}
        >
          <Text fontSize="x-large">Modifier une commade</Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default Choose;
