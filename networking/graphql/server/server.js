const { gql, ApolloServer } = require('apollo-server');

const users = [
  {
    id: 0,
    name: 'JS Cafe',
    problems: [0, 1],
  },
  {
    id: 1,
    name: 'Roadside Coder',
    problems: [1, 2],
  },
];

const problems = [
  {
    id: 0,
    title: 'Two Sum',
    solvers: [0],
  },
  {
    id: 1,
    title: 'Three Sum',
    solvers: [0, 1],
  },
  {
    id: 2,
    title: 'Four Sum',
    solvers: [1],
  },
];

const typeDefs = gql(`
     type User {
        id: ID,
        name: String,
        problems: [Problem]
     }

     type Problem {
        id: ID,
        title: String,
        solvers: [User]
     }

     type Query {
        users: [User],
        problems: [Problem]
     }
`);

// Resolvers
const resolvers = {
  Query: {
    users: () => {
      return users;
    },
    problems: () => {
      return problems;
    },
  },
  User: {
    problems: (user) => {
      // user gives each individual user object one by one
      return problems.filter((problem) => problem.solvers.includes(user.id));
    },
  },
  Problem: {
    solvers: (problem) => {
      return users.filter((user) => user.problems.includes(problem.id));
    },
  },
};

// Using typedef and Resolvers , we will create Apollo Servers

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(4000).then(({ url }) => {
  console.log(`Graph QL started on ${url}`);
});
