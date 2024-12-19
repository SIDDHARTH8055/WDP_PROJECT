import { GraphQLClient } from 'graphql-request';

export const graphqlClient = new GraphQLClient(process.env.API_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
});
