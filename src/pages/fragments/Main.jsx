import React, { useState } from 'react';
import CommandeItem from '../../components/CommandeItem';
import CommandeContainer from '../../components/CommandeContainer';
import ProductContainer from '../../components/ProductContainer';
import ProducItem from '../../components/ProducItem';
import { FaShoppingCart } from 'react-icons/fa';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  Input,
  Slide,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import CategoryContainer from '../../components/CategoryContainer';
import CategoryItem from '../../components/CategoryItem';
import { API_URL, fetchAPI } from '../../api/common';
import Panier from '../../components/Panier';
import { useDispatch } from 'react-redux';
import { addComposition, addOrder } from '../../redux/features/order';
import AddComposBtn from '../../components/AddComposBtn';
import CustomAlertDialog from '../../components/CustomAlertDialog';
import MultiSelectMenu from '../../components/MultiselectMenu';
import { setSelectedItem } from '../../redux/features/multicompose';
function Main() {
  const [showPan, setShowPan] = useState(false);
  const [Categories, setCategories] = useState([]);
  const [Products, setProducts] = useState([]);
  const [Commandes, setCommandes] = useState([]);
  const [FilterMenu, setFilterMenu] = useState(Products);
  const [compositions, setComposition] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  function onFilter(id) {
    if (id === 'all') {
      return setFilterMenu(Products);
    } else {
      return setFilterMenu(Products.filter(product => product.category === id));
    }
  }
  const dispatch = useDispatch();
  function togglePan() {
    setShowPan(!showPan);
  }
  function onSearch(e) {
    return setFilterMenu(Products.filter(product => String(product.nom).toLowerCase().includes(String(e.target.value).toLowerCase())));
  }
  async function fetchCommande() {
    const { commandes } = await fetchAPI(
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
  }, [showPan,Commandes]);
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
            {Commandes && Commandes.map((c, i) => (
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
                }}
              >
                {/* <InputGroup>
                    <Select>
                      <option value=''>Selection un produit</option>
                      {Products.map((p, i) => (
                        <option value={p.id} key={i}>{ p.nom }</option>
                      ))}
                    </Select>
                    <IconButton icon={<FaPlus/>} bg="orange.500"/>
                  </InputGroup> */}
                <MultiSelectMenu
                  label="Selectionner les produit pour la composition"
                  options={Products}
                  onChange={val => {
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
        </GridItem>
        <Slide direction="left" in={showPan}>
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
            <Panier />
          </GridItem>
        </Slide>
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
          <Panier />
        </GridItem>
      </Grid>
      <Button
        onClick={togglePan}
        position="fixed"
        bottom={10}
        right={5}
        size="lg"
        rounded="lg"
        bg="orange"
        display={{ base: 'block', xl: 'none' }}
      >
        <Icon as={FaShoppingCart} />
      </Button>
    </>
  );
}

export default Main;
