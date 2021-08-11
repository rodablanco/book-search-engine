const express = require('express');
const path = require('path');
const { ApolloServer } = require('apolo-server-express');
const db = require('./config/connection');

//importing schemas
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
})

//running apollo server
(async () => {
  await server.start();
server.applyMiddleware({ app })
})


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})


db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
   // log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
});
