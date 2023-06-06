import React from "react";
import LargeGridContainer from "../../components/LargeGridContainer";
import {Box, Flex, GridItem, Heading} from "@chakra-ui/react";
import {API_URL} from "../../api/common";
import {useDispatch} from "react-redux";
import {setTable} from "../../redux/features/order";

function Tables() {
  const [CommandeTables, setCommandeTable] = React.useState([]);
  const dispatch = useDispatch();
  async function fetchTable() {
    const data = await fetch(`${API_URL}/common/table`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    }).then(async r => await r.json());
    setCommandeTable(data);
  }
  React.useEffect(() => {
    fetchTable();
  }, []);
  return (
    <LargeGridContainer>
      {CommandeTables.map((cTable, i) =>
        <GridItem
          cursor="pointer"
          key={i}
          onClick={() => dispatch(setTable(cTable))}
        >
          <Box p={8} width="100%" bg="goldenrod" rounded={8}>
            <Flex alignItems="center" justifyContent="center">
              <Heading color="white">
                {cTable.nom}
              </Heading>
            </Flex>
          </Box>
        </GridItem>
      )}
    </LargeGridContainer>
  );
}

export default Tables;
