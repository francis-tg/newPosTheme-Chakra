import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import theme from './hooks/theme';
import LoginPage from './pages/Login';
import PrivateRoute from './components/PrivateRouter';
import Error500 from './pages/Error500';
import ErrorBoundary from './ErrorBoundary';
import Error404 from './pages/Error404';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <ErrorBoundary>
          <NavBar />
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/500" element={<Error500 />} />
            <Route path="/404" element={<Error404 />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
