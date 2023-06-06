import React,{ useState } from "react";
import CommandeItem from '../../components/CommandeItem';
import CommandeContainer from '../../components/CommandeContainer';
import ProductContainer from '../../components/ProductContainer';
import ProducItem from '../../components/ProducItem';
import { FaShoppingCart } from 'react-icons/fa';
import { Box, Button, Grid, GridItem,Icon,Slide,Text} from '@chakra-ui/react';
import CategoryContainer from "../../components/CategoryContainer";
import CategoryItem from "../../components/CategoryItem";
import { API_URL, fetchAPI } from "../../api/common";
import Panier from "../../components/Panier";
import { useDispatch } from "react-redux";
import { addOrder } from "../../redux/features/order";
import AddComposBtn from "../../components/AddComposBtn";
function Main() {
  const [showPan, setShowPan] = useState(false);
  const [Categories, setCategories] = useState([]);
  const [Products, setProducts] = useState([]);
  const [Commandes, setCommandes] = useState([]);
  const dispatch = useDispatch()
    function togglePan() {
    setShowPan(!showPan)
  }
  async function fetchProduitsAndCategories() {
    const { categories, produits } = await fetchAPI("GET", `${API_URL}/common/produit`,{},{Authorization: `Bearer ${sessionStorage.getItem("token")}`}).then(async (r) => await r.json())
    setCategories(categories)
    setProducts(produits)
  }
  React.useEffect(() => {
    fetchProduitsAndCategories()
  },[])
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
            <CategoryContainer>
              {Categories.map((categorie, i) => (
                <CategoryItem name={categorie.nom} key={i}/>
              ))}
              
          </CategoryContainer>
          <Box>
            <Text fontSize="xl" color="gray.500">Products</Text>
              <ProductContainer>
                <AddComposBtn/>
                {Products.map((product, i) => (
                  <ProducItem produit={product} key={i} onClick={()=>dispatch(addOrder(product)) } />
              ))}
            </ProductContainer>
          </Box>
        </GridItem>
        <Slide direction='left'  in={showPan}>
            <GridItem rowSpan={2} id='right-pan' position={{ base: "fixed", sm: "fixed", xl: "sticky" }} left={{ base: showPan ? "0" : "-100%", sm: showPan ? "0" : "-100%", lg: "0" }} bg="whatsapp.100" width="350px" height={{ base: "100%", xl: "100%" }} >
              <Panier/>
          </GridItem>
          </Slide>
          <GridItem rowSpan={2} display={{ base: "none", xl: "block" }} id='right-pan' position={{ base: "fixed", sm: "fixed", xl: "sticky" }} left={{ base: showPan ? "0" : "-100%", sm: showPan ? "0" : "-100%", xl: "100%" }} top={0} bg="whatsapp.100" width="350px" height={{ base: "100%", xl: "100%" }} >
            <Panier/>
          </GridItem>
      </Grid>
      <Button onClick={togglePan} position="fixed" bottom={10} right={5} size="lg" rounded="lg" bg="orange" display={{base:"block", xl:"none" }}>
        <Icon as={FaShoppingCart} />
      </Button>
  </>)
}

export default Main;
