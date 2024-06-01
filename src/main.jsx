import React from 'react'
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import theme from "./theme";


const customTheme = extendTheme(theme);



ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={customTheme}>
  <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
  <BrowserRouter>
    <App />
  </BrowserRouter>
</ChakraProvider>,
)
