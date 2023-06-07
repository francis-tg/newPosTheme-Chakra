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
import {FaTimes} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {
  /*  addQuantity, */
  removeArticle
  /* removeQuantity */
} from "../redux/features/order";
function ComposPanierItem({article, index}) {
  // const [quantite, setQuantite] = React.useState(article.quantite);
  const dispatch = useDispatch();
  /* function addArtilceQuantite() {
    setQuantite(quantite + 1);
    return dispatch(addQuantity(article));
  }
  function reduceQunatite() {
    if (quantite > 1) {
      setQuantite(quantite - 1);
      return dispatch(removeQuantity(article));
    }
  } */
  return (
    <GridItem bg="gray.100" p={2} rounded={10}>
      <Box>
        <Flex>
          <Heading size="md">
            {article[0].produitName} {"+"} {article[1].produitName}
            {article[2] && "+" + article[2].produitName}
          </Heading>
          <Spacer />
          <Button
            onClick={() =>
              dispatch(
                removeArticle({
                  type: "composition",
                  index: article[0].tag
                })
              )}
          >
            <Icon as={FaTimes} />
          </Button>
        </Flex>
        <Flex>
          <Heading size="sm">
            {article[2]
              ? parseInt(article[0].price) +
                parseInt(article[1].price) +
                parseInt(article[2].price)
              : parseInt(article[0].price) + parseInt(article[1].price)}{" "}
            F
          </Heading>
          <Spacer />
          <Box>
            <Flex alignItems="center">
              {/* <Button
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
              </Button> */}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </GridItem>
  );
}

export default ComposPanierItem;
