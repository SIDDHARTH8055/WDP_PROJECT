import { GraphQLClient } from 'graphql-request';
import Config from "react-native-config";

const graphqlClient = new GraphQLClient(Config.API_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
});
export default graphqlClient;
