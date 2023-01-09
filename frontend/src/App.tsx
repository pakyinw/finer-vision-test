import React, { useState } from 'react'
import { trpc } from './utils/trpc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import Survey from './Survey'

function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: process.env.endpoint || '',
          fetch(url, options) {
            return fetch(url, {
              ...options,
            })
          },
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Survey></Survey>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
