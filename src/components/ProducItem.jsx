import {Box, Divider, Flex, GridItem, Text, useToast} from "@chakra-ui/react";
import React from "react";

function ProducItem({produit, onClick}) {
  const toast = useToast({
    position: "top-right"
  });
  return (
    <GridItem
      _disabled={{opacity: "0.5", cursor: "not-allowed"}}
      disabled={produit["Article.quantite"] <= 0}
      bg={produit["Article.quantite"] > 0 ? "green.400" : "red.400"}
      p={5}
      rounded="md"
      onClick={() => {
        produit["Article.quantite"] <= 0
          ? toast({
              title: "Attention!",
              description: "Ooups!...",
              status: "error",
              duration: 5000
            })
          : onClick();
      }}
    >
      <Box cursor="pointer">
        <Text fontSize={{base: "md", xl: "lg"}} fontWeight="bold">
          {produit.nom}
        </Text>
        <Flex mb={2} mt={2}>
          <Text fontSize={{base: "md", xl: "lg"}}>Prix: </Text>
          <Text fontSize={{base: "md", xl: "lg"}} fontWeight="bold">
            {produit.price} F
          </Text>
        </Flex>
        <Divider />
        <Flex>
          <Text>
            Quantité:{" "}
            {(!produit["Article.protionnable"] &&
              produit["Article.quantite"]) ||
              produit["Article.portions"]}
          </Text>
        </Flex>
      </Box>
    </GridItem>
  );
}

export default ProducItem;
