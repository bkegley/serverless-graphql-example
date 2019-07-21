const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    user(token: String!): User
  }
  type User {
    id: ID!
    name: String!
    secret: String
  }
`;

const users = [
  {
    token: 11111,
    id: 1,
    name: "Terry Pratchett",
    secret: "this is really secret"
  },
  {
    token: 22222,
    id: 2,
    name: "Stephen King",
    secret: "this is really secret"
  },
  { token: 33333, id: 3, name: "JK Rowling", secret: "this is really secret" }
];

const resolvers = {
  Query: {
    user: (root, args) => {
      if (args.token) return users.find(user => user.token === args.token);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

exports.handler = server.createHandler();
