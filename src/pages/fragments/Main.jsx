import React,{ useState } from "react";
import CommandeItem from '../../components/CommandeItem';
import CommandeContainer from '../../components/CommandeContainer';
import ProductContainer from '../../components/ProductContainer';
import ProducItem from '../../components/ProducItem';
import { FaShoppingCart } from 'react-icons/fa';
import { Box, Button, Grid, GridItem,Icon,Slide,Text} from '@chakra-ui/react';
function Main() {
    const [showPan, setShowPan] = useState(false)
    function openPan() {
    setShowPan(!showPan)
  }
    return (
      <>
      <Grid
        h="100vh"
        templateRows={{base:"repeat(1 1fr)",xl:"repeat(2 1fr)"}}
        templateColumns={{base:"repeat(1, 3fr)",xl:"repeat(4, 3fr)"}}
        gap={4}
        maxW="container.xs"
        mx="auto"
        px={4}
        py={2}
      >
        <GridItem colSpan={3} rowSpan={2} >
          <CommandeContainer>
            <CommandeItem />
            <CommandeItem />
            <CommandeItem />
            <CommandeItem />
            <CommandeItem />
            <CommandeItem />
            <CommandeItem />
            <CommandeItem />
            <CommandeItem/>
          </CommandeContainer>
          <Box>
            <Text fontSize="xl" color="gray.500">Products</Text>
            <ProductContainer>
              <ProducItem />
              <ProducItem />
              <ProducItem />
              <ProducItem />
              <ProducItem />
              <ProducItem/>
            </ProductContainer>
          </Box>
        </GridItem>
        <Slide direction='left'  in={showPan}>
          <GridItem  rowSpan={2} position={{base:"fixed",xl:"sticky"}} id='right-pan'  left={{base:showPan?"0":"-100%",xl:"100%",sm:showPan?"0":"-100%"}}  bg="teal" width="350px" height={{base:"100%",xl:"100%"}} />
        </Slide>
      </Grid>
      <Button onClick={openPan} position="fixed" bottom={10} right={5} size="lg" rounded="lg" bg="orange" display={{base:"block", xl:"none" }}>
        <Icon as={FaShoppingCart} />
      </Button>
  </>)
}

export default Main;
