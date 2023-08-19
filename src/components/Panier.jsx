import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  Spacer,
} from '@chakra-ui/react';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import PanierItem from './PanierItem';
import { useDispatch, useSelector } from 'react-redux';
import ComposPanierItem from './ComposPanierItem';
import { groupObjectsByValue } from '../api/common';
import { setCommande } from '../redux/features/order';

function Panier({ key, onClose }) {
  const orders = useSelector(state => state.OrderReduce.orders.order ?? []);
  const orderTotal = useSelector(state => state.OrderReduce.orders.total ?? 0);
  const Compositions = useSelector(
    state => state.OrderReduce.compositions ?? []
  );
  const table_name = useSelector(
    state => state.OrderReduce.orders.table_name ?? ''
  );
  const groupedCompos = groupObjectsByValue(Compositions, 'tag');
  const dispatch = useDispatch();
  return (
    <Box color="black" key={key}>
      <Box>
        <Flex py={2}>
          <Box>
            <Heading as="h2" size="lg">
              Panier
            </Heading>
            <Heading fontSize="md">{table_name}</Heading>
          </Box>
          <Spacer />

          <Heading size="md">{orderTotal} F</Heading>
          <Button onClick={onClose} display={{ base: 'block', xl: 'none' }}>
            <Icon as={FaTimes} />
          </Button>
        </Flex>
        <Divider border="1px" />
      </Box>
      <Box
        p={2}
        overflowX="hidden"
        overflowY="auto"
        maxHeight={{ base: '88vh', xl: '85vh' }}
        height={{ base: '88vh', xl: '85vh' }}
      >
        <Grid gap={2}>
          {typeof orders === 'object' &&
            orders.length > 0 &&
            orders.map((simpleOrder, i) => (
              <PanierItem article={simpleOrder} index={i} key={i} />
            ))}
          {typeof groupedCompos === 'object' &&
            groupedCompos.length > 0 &&
            groupedCompos.map((compos, i) => (
              <ComposPanierItem article={compos} index={i} key={i} />
            ))}
        </Grid>
      </Box>
      <Button
        bg="orange"
        width="100%"
        _hover={{ bg: 'green' }}
        onClick={() => dispatch(setCommande())}
      >
        Commander
      </Button>
    </Box>
  );
}

export default Panier;
