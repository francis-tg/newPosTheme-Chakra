import React from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import theme from "./hooks/theme";
import LoginPage from "./pages/Login";
import PrivateRoute from "./components/PrivateRouter";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
