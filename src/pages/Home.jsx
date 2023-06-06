import React from "react";

import {useSelector} from "react-redux";
import Main from "./fragments/Main";
import Tables from "./fragments/Tables";
import Serveuses from "./fragments/Serveuses";
import Choose from "./fragments/Choose";

function Home() {
  const type = useSelector(state => state.OrderReduce.type);
  const serveuse = useSelector(state => state.OrderReduce.orders.user_id);
  const table = useSelector(state => state.OrderReduce.orders.table_id);
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
