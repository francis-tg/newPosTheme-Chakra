import {
  Avatar,
  Button,
  Flex,
  Heading,
  Spacer,
  useColorModeValue
} from "@chakra-ui/react";
import React from "react";
import {ColorModeSwitcher} from "../ColorModeSwitcher";

function NavBar() {
  const textColor = useColorModeValue("black", "black");
  return (
    <Flex align="center" p={2} bg="orange.100" textColor={textColor}>
      <Heading as="h5" size={{sm: "sm", lg: "lg"}}>
        Place de la victoire
      </Heading>
      <Spacer />
      <Avatar size="sm" marginEnd={2} />
      <Button bg="red.400" size="sm">
        Déconnexion
      </Button>
      <ColorModeSwitcher />
    </Flex>
  );
}

export default NavBar;
