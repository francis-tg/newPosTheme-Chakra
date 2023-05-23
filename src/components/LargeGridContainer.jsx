import {Grid} from "@chakra-ui/react";
import React from "react";

function LargeGridContainer({children, props}) {
  return (
    <Grid
      templateColumns={{base: "repeat(4, 1fr)", xl: "repeat(8, 1fr)"}}
      {...props}
    >
      {children}
    </Grid>
  );
}

export default LargeGridContainer;
