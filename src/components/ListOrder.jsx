import { Box, List } from '@chakra-ui/react';
import React from 'react'
import { useSelector } from 'react-redux';
import PanierItem from './PanierItem';
import { groupObjectsByValue } from '../api/common';
import ComposPanierItem from './ComposPanierItem';

function ListOrder() {
    const { orders, compositions } = useSelector(state => state.OrderReduce);
    const groupedCompos = groupObjectsByValue(compositions, "tag");
  return (
      <List>
              {
              orders.order.map((item, key) => (
                  <Box mb={3}>
                      <PanierItem article={item} index={key} key={key}></PanierItem>
                  </Box>
                  ))
          }
          {groupedCompos.map((compos, i) =>
              <Box mb={3}>
                  <ComposPanierItem article={compos} index={i} key={i} />
            </Box>
          )}
          
    </List>
  )
}

export default ListOrder