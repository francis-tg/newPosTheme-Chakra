import React from "react";

import {useSelector} from "react-redux";
import Main from "./fragments/Main";
import Tables from "./fragments/Tables";
import Serveuses from "./fragments/Serveuses";
import Choose from "./fragments/Choose";
import {socket} from "../api/socket";
import {useColorModeValue, useToast} from "@chakra-ui/react";

function Home() {
  const type = useSelector(state => state.OrderReduce.type);
  const serveuse = useSelector(state => state.OrderReduce.orders.user_id);
  const table = useSelector(state => state.OrderReduce.orders.table);
  const toastMode = useColorModeValue("left-accent", "solid");
  const toast = useToast({variant: toastMode, position: "top-right"});
  React.useEffect(() => {
    socket.on("table close", data => {
      navigator.vibrate([
        100,
        30,
        100,
        30,
        100,
        30,
        200,
        30,
        200,
        30,
        200,
        30,
        100,
        30,
        100,
        30,
        100
      ]);
      toast({
        title: "Attention!",
        description: `La table ${data} s'est libéré`
      });
    });
  }, [toast]);
  let render = "";
  if (type === "edit") {
    return <Main />;
  }
  if (type === "new") {
    render = <Serveuses />;
    if (serveuse) {
      render = <Tables />;
    }
    if (table) {
      render = <Main />;
    }
    return render;
  }
  if (!type || !serveuse || !table) {
    return <Choose />;
  }
}

export default Home;
