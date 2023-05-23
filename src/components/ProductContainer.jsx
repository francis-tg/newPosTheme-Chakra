import {Grid} from "@chakra-ui/react";
import React from "react";

function ProductContainer({children}) {
  return (
    <Grid
      templateColumns={{base: "repeat(4, 1fr)", xl: "repeat(5, 1fr)"}}
      py={5}
      gap={{base: 3, xl: 5}}
    >
      {children}
    </Grid>
  );
}

export default ProductContainer;
