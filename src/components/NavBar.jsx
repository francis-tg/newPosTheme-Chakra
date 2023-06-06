import {
  Avatar,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useColorModeValue
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {ColorModeSwitcher} from "../ColorModeSwitcher";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/user";

function NavBar() {
  const isAuth = useSelector(state => state.UserReduce.isAuth);
  const userData = useSelector((state) => state.UserReduce.userData);
  const textColor = useColorModeValue("black", "black");
  const dispatch = useDispatch()
  const [authState, setAuthState] = useState(false)
  useEffect(() => {
    setAuthState(isAuth)
  },[authState])
  return (
    <Flex align="center" p={2} bg="orange.100" textColor={textColor}>
      <Heading as="h5" size={{sm: "sm", lg: "lg"}}>
        Place de la victoire
      </Heading>
      <Spacer />
      {authState ? (<>
        <Menu>
          <MenuButton>
            {userData.username} <Avatar size="sm" marginEnd={2} /> 
          </MenuButton>
          <MenuList>
          <MenuItem as={Button} bg="red.400" size="sm" onClick={()=>{dispatch(logout())}}>Déconnexion</MenuItem>
  </MenuList>
        </Menu>
      
      
      </>) : ""}
      <ColorModeSwitcher />
    </Flex>
  );
}

export default NavBar;
