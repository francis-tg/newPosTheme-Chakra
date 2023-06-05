import {Grid} from "@chakra-ui/react";
import React from "react";

function LargeGridContainer({children, props}) {
  return (
    <Grid
      templateColumns={{base: "repeat(3, 1fr)", xl: "repeat(8, 1fr)"}}
      {...props}
      m={5}
      gap={4}
    >
      {children}
    </Grid>
  );
}

export default LargeGridContainer;
