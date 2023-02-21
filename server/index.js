require('colors');
require('dotenv').config();

const schema = require('./schema/schema');
const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
const { graphqlHTTP } = require('express-graphql');

const PORT = process.env.PORT || 5000;

const app = express();
connectDB().then(() => console.log('MongoDB Connected'.cyan.underline.bold));

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(PORT, (err) => {
  if (err) console.log('Error in server setup');
  console.log('Server listening on Port', PORT);
});
