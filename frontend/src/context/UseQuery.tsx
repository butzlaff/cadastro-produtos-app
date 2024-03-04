"use client";

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient()

function QueryContext ({ children}: { children: React.ReactNode }) {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      { children }
    </QueryClientProvider>
  )
}

export default QueryContext;