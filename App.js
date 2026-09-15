import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <NativeRouter>
        <Main />
      </NativeRouter>
    </ApolloProvider>
  );
};

export default App;