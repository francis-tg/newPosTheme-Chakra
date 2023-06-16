import React, { useRef, useState } from 'react';
import CommandeItem from '../../components/CommandeItem';
import CommandeContainer from '../../components/CommandeContainer';
import ProductContainer from '../../components/ProductContainer';
import ProducItem from '../../components/ProducItem';
import { FaShoppingCart } from 'react-icons/fa';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Fade,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Input,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import CategoryContainer from '../../components/CategoryContainer';
import CategoryItem from '../../components/CategoryItem';
import { API_URL, fetchAPI } from '../../api/common';
import Panier from '../../components/Panier';
import { useDispatch, useSelector } from 'react-redux';
import { addComposition, addOrder, setCommande, videPanier } from '../../redux/features/order';
import AddComposBtn from '../../components/AddComposBtn';
import CustomAlertDialog from '../../components/CustomAlertDialog';
import MultiSelectMenu from '../../components/MultiselectMenu';
import { setSelectedItem } from '../../redux/features/multicompose';
import ListOrder from '../../components/ListOrder';
function Main() {
  const [showPan, setShowPan] = useState(false);
  const [Categories, setCategories] = useState([]);
  const [Products, setProducts] = useState([]);
  const [Commandes, setCommandes] = useState([]);
  const [FilterMenu, setFilterMenu] = useState(Products);
  const [compositions, setComposition] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
   const orders = useSelector(state => state.OrderReduce.orders.order);
  const orderTotal = useSelector(state => state.OrderReduce.orders.total);
  const Compositions = useSelector(state => state.OrderReduce.compositions);
  const btnRef = useRef()
  function onFilter(id) {
    if (id === 'all') {
      return setFilterMenu(Products);
    } else {
      return setFilterMenu(Products.filter(product => product.category === id));
    }
  }
  function closePane() {
    setShowPan(false)
  }
  const dispatch = useDispatch();
  function togglePan() {
    setShowPan(!showPan);
  }
  function onSearch(e) {
    return setFilterMenu(Products.filter(product => String(product.nom).toLowerCase().includes(String(e.target.value).toLowerCase())));
  }
  async function fetchCommande() {
    const commandes = await fetchAPI(
      'GET',
      `${API_URL}/common/commande/all`,
      {},
      { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    ).then(async r => await r.json());
    
    commandes && setCommandes(commandes);
  }
  async function fetchProduitsAndCategories() {
    const { categories, produits } = await fetchAPI(
      'GET',
      `${API_URL}/common/produit`,
      {},
      { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    ).then(async r => await r.json());
    setCategories(categories);
    setProducts(produits);
    setFilterMenu(produits);
  }
  React.useEffect(() => {
    fetchProduitsAndCategories();
    window.addEventListener("resize", () => {
      if (window.screen.width > 780) {
    setShowPan(false)
      }
      
    })
   
    fetchCommande()
  }, [showPan]);
  return (
    <>
      <Grid
        h="100vh"
        templateRows={{ base: 'repeat(1 1fr)', xl: 'repeat(2 1fr)' }}
        templateColumns={{ base: 'repeat(1, 3fr)', xl: 'repeat(4, 3fr)' }}
        gap={3}
        maxW="container.xs"
        mx="auto"
        px={4}
        py={2}
      >
        <GridItem colSpan={3} rowSpan={2}>
          <CommandeContainer>
            {Commandes.length>0&&Commandes.map((c, i) => (
              <CommandeItem commande={c} key={i}/>
            ))}
            
          </CommandeContainer>
          <CategoryContainer>
            <CategoryItem name="Tous" onClick={() => onFilter('all')} />
            {Categories.map((categorie, i) => (
              <CategoryItem
                name={categorie.nom}
                key={i}
                onClick={() => onFilter(categorie.id)}
              />
            ))}
          </CategoryContainer>
          <Box>
            <Text fontSize="xl" color="gray.500">
              Products
            </Text>
            <Input type='search' onChange={onSearch} placeholder='Chercher un article ici...'/>
            <ProductContainer>
              <AddComposBtn onClick={onOpen} />
              <CustomAlertDialog
                isOpen={isOpen}
                onClose={onClose}
                title="Créer un composition"
                showConfirmBtn={true}
                confirmColor="orange"
                confirmText="Ajouter"
                onConfirm={() => {
                  dispatch(addComposition(compositions));
                  dispatch(setSelectedItem([]))
                  onClose()
                }}
              >
                <MultiSelectMenu
                  label="Selectionner les produit pour la composition"
                  options={Products}
                  onChange={val => {
                    console.log(val)
                    setComposition(val)
                    
                  }}
                ></MultiSelectMenu>
              </CustomAlertDialog>
              {FilterMenu.map((product, i) => (
                <ProducItem
                  produit={product}
                  key={i}
                  onClick={() => dispatch(addOrder(product))}
                />
              ))}
            </ProductContainer>
          </Box>
          
            
            <Fade in={!![...orders,...Compositions].length>0}  onClick={togglePan}>
            <Flex justifyContent={"center"} width={"100%"}>
              <Flex position={"fixed"} m={"auto"} rounded={"md"} bottom={0} background={"whatsapp.400"} w={"60%"} height={"40px"} alignItems={"center"} p={4}>
                <Heading color={"black"} size={"md"} >{[...orders,...Compositions].length} article{[...orders,...Compositions].length > 1 && "s"} choisi{[...orders,...Compositions].length > 1 && "s"} </Heading>
                <Spacer />
                <Heading size={"md"} color={"black"}>
                  Total:  {orderTotal} F
                </Heading>
               </Flex>
            </Flex>
        </Fade>
      
        </GridItem>
        {/* <Slide direction="left" in={showPan}>
          <GridItem
            rowSpan={2}
            id="right-pan"
            position={{ base: 'fixed', sm: 'fixed', xl: 'sticky' }}
            left={{
              base: showPan ? '0' : '-100%',
              sm: showPan ? '0' : '-100%',
              xl: '-100%',
            }}
            bg="whatsapp.100"
            width="350px"
            height={{ base: '100%', xl: '100%' }}
          >
            <Panier onClose={togglePan} />
          </GridItem>
        </Slide> */}
        <Drawer isOpen={showPan} placement='left' size={"md"} finalFocusRef={btnRef} onClose={closePane}>
           <DrawerOverlay />
          <DrawerContent>
          <DrawerCloseButton />
            <DrawerHeader>
              Commandes
              <Text>

              </Text>
            </DrawerHeader>

          <DrawerBody>
             <ListOrder/>
          </DrawerBody>

          <DrawerFooter>
              <Button variant='outline' colorScheme='red' mr={3} onClick={() => {
                dispatch(videPanier())
                closePane()
            }}>
              Vider le panier
            </Button>
            <Button colorScheme='whatsapp' onClick={() => dispatch(setCommande())} w={"100%"}>Commander</Button>
          </DrawerFooter>
        </DrawerContent>
        </Drawer>
        <GridItem
          rowSpan={2}
          display={{ base: 'none', xl: 'block' }}
          id="right-pan"
          position={{ base: 'fixed', sm: 'fixed', xl: 'sticky' }}
          left={{
            base: showPan ? '0' : '-100%',
            sm: showPan ? '0' : '-100%',
            xl: '100%',
          }}
          top={0}
          bg="whatsapp.100"
          width="100%"
          height={{ base: '100%', xl: '95vh' }}
        >
          <Panier onClose={togglePan} />
        </GridItem>
      </Grid>
      <Button
        onClick={togglePan}
        position="fixed"
        bottom={10}
        right={5}
        size="lg"
        rounded="lg"
        ref={btnRef}
        bg="orange"
        display={{ base: 'block', xl: 'none' }}
      >
        <Icon as={FaShoppingCart} />
      </Button>
     
    </>
  );
}

export default Main;
