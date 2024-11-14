import Main from './src/components/Main';
import createApolloClient from './src/components/utils/apolloClient';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';

export default function App() {

  const apolloClient = createApolloClient()

  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
    </>
  );
}
