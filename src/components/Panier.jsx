import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  Spacer
} from "@chakra-ui/react";
import React from "react";
import {FaTimes} from "react-icons/fa";
import PanierItem from "./PanierItem";
import {useSelector} from "react-redux";

function Panier() {
  const orders = useSelector(state => state.OrderReduce.orders.order);
  const table_name = useSelector(state => state.OrderReduce.orders.table_name);
  return (
    <Box color="black">
      <Box>
        <Flex py={2}>
          <Box>
            <Heading as="h2" size="lg">
              Panier
            </Heading>
            <Heading fontSize="md">
              {table_name}
            </Heading>
          </Box>
          <Spacer />
          <Button>
            <Icon as={FaTimes} />
          </Button>
        </Flex>
        <Divider border="1px" />
      </Box>
      <Box p={2} overflowX="hidden" overflowY="auto" maxHeight="80vh">
        <Grid gap={2}>
          {orders.map((order, i) => <PanierItem article={order} index={i} />)}
        </Grid>
      </Box>
    </Box>
  );
}

export default Panier;
