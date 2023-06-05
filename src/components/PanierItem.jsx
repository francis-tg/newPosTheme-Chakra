import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  Icon,
  Spacer
} from "@chakra-ui/react";
import React from "react";
import {FaMinus, FaPlus, FaTimes} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {
  addQuantity,
  removeArticle,
  removeQuantity
} from "../redux/features/order";
function PanierItem({article, index}) {
  const [quantite, setQuantite] = React.useState(article.quantite);
  const dispatch = useDispatch();
  function addArtilceQuantite() {
    setQuantite(quantite + 1);
    return dispatch(addQuantity(article));
  }
  function reduceQunatite() {
    if (quantite > 1) {
      setQuantite(quantite - 1);
      return dispatch(removeQuantity(article));
    }
  }
  return (
    <GridItem bg="gray.100" p={2} rounded={10}>
      <Box>
        <Flex>
          <Heading size="md">
            {article.productName}
          </Heading>
          <Spacer />
          <Button onClick={() => dispatch(removeArticle(index))}>
            <Icon as={FaTimes} />
          </Button>
        </Flex>
        <Flex>
          <Heading size="sm">
            {article.total} F
          </Heading>
          <Spacer />
          <Box>
            <Flex alignItems="center">
              <Button
                bg="orange.500"
                _hover={{bg: "orange.500"}}
                onClick={reduceQunatite}
              >
                <Icon as={FaMinus} />
              </Button>
              <Button>
                {quantite}
              </Button>
              <Button
                bg="orange.500"
                onClick={addArtilceQuantite}
                _hover={{bg: "orange.500"}}
              >
                <Icon as={FaPlus} />
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </GridItem>
  );
}

export default PanierItem;
