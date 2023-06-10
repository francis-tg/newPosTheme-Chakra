import {Box, Flex, Text, Badge, useColorModeValue} from "@chakra-ui/react";
import React from "react";

function CommandeItem({commande}) {
  const textColor = useColorModeValue("black", "black");
  return (
    <Box
      p={5}
      bg="gray.200"
      textColor={textColor}
      w="20%"
      minWidth={{base: "50%", md: "40%", xl: "20%", lg: "30%"}}
      rounded="md"
    >
      <Flex justifyContent="start" direction="column">
        <Flex justifyContent="space-between" pb={4}>
          <Text>
            {commande.cmd_id}
          </Text>
          <Text>
            {commande.total} F
          </Text>
        </Flex>

        <Flex justifyContent="space-between" pt={4}>
          <Text>
            {commande.products&& commande.menus? [...commande.products, ...commande.menus].length:0} Articles
          </Text>
          <Text>
            <Badge bg={commande.status === 1 ? "orange.400" : "green.400"}>
              {commande.status === 1 ? "En cours" : "Terminé"}
            </Badge>
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default CommandeItem;
