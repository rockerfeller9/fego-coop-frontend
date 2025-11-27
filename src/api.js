import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App'; // Adjust the import based on your file structure

ReactDOM.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);