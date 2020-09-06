import '../css/tailwind.css'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@/lib/apollo-client'

const App = ({ Component, pageProps }) => {
  const apollo = useApollo()
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
