import {Box, Flex, GridItem, Heading} from "@chakra-ui/react";
import React from "react";
import LargeGridContainer from "../../components/LargeGridContainer";
import {API_URL, fetchAPI} from "../../api/common";
import {useDispatch} from "react-redux";
import {setBarista} from "../../redux/features/order";

function Serveuses() {
  const [Serveuse, setSeveuse] = React.useState([]);
  const dispatch = useDispatch();
  async function fetchServeuse() {
    try {
      const data = await fetchAPI("GET", `${API_URL}/common/serveuse`).then(
        async r => await r.json()
      );

      setSeveuse(data);
    } catch (error) {}
  }
  React.useEffect(() => {
    fetchServeuse();
  }, []);

  return (
    <LargeGridContainer>
      {Serveuse.map((serveuse, i) =>
        <GridItem
          key={i}
          cursor="pointer"
          onClick={() => {
            dispatch(setBarista(serveuse.id));
          }}
        >
          <Box p={8} width="100%" bg="teal.200" rounded={8}>
            <Flex justifyContent="center" alignItems="center">
              <Heading size="md" color="teal.800">
                {serveuse.nom} {serveuse.prenom}
              </Heading>
            </Flex>
          </Box>
        </GridItem>
      )}
    </LargeGridContainer>
  );
}

export default Serveuses;
