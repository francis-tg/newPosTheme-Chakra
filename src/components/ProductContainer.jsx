import {Grid} from "@chakra-ui/react";
import React from "react";

function ProductContainer({children}) {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 3fr)",
        xl: "repeat(5, 3fr)",
        lg: "repeat(4, 2fr)",
        sm: "repeat(3, 3fr)"
      }}
      py={5}
      gap={{base: 3, xl: 5}}
    >
      {children}
    </Grid>
  );
}

export default ProductContainer;
