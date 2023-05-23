import {Box, GridItem} from "@chakra-ui/react";
import React from "react";
import LargeGridContainer from "../../components/LargeGridContainer";

function Serveuses() {
  return (
    <LargeGridContainer mt={10}>
      <GridItem>
        <Box p={5} bg="teal.200" />
      </GridItem>
    </LargeGridContainer>
  );
}

export default Serveuses;
