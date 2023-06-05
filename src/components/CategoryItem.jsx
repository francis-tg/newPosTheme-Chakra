import {Button} from "@chakra-ui/react";
import React from "react";

function CategoryItem({name}) {
  return (
    <Button
      minWidth={{base: "20%", md: "20%", xl: "10%", lg: "20%"}}
      variant="solid"
      bg="orange.500"
      color="white"
      _hover={{
        bg: "orange.700"
      }}
      rounded={104}
    >
      {name}
    </Button>
  );
}

export default CategoryItem;
