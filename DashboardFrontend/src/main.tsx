import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from "react-router-dom";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 15_000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
<QueryClientProvider client={queryClient}>

    <ChakraProvider>
      <BrowserRouter>
      <App />
    </BrowserRouter>,
    <ReactQueryDevtools></ReactQueryDevtools>
    </ChakraProvider>
</QueryClientProvider>
  </React.StrictMode>,
)
