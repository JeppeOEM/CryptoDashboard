import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
<QueryClientProvider client={new QueryClient()}>

    <ChakraProvider>
    <App />
    <ReactQueryDevtools></ReactQueryDevtools>
    </ChakraProvider>
</QueryClientProvider>
  </React.StrictMode>,
)
