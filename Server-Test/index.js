const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
    resolved: String
  }
`;

const mocks = {
    Int: () => 6,
    Float: () => 22.1,
    String: () => 'Hello',
};

const server = new ApolloServer({
    typeDefs,
    mocks
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});