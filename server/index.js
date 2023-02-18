const express = require('express');
require('dotenv').config();
const { graphqlHTTPLHTTP } = require('express-graphql');
const port = process.env.PORT || 5000;

const app = express();
app.use('/graphql', graphqlHTTPLHTTP({}));
app.listen(port, console.log(`Server running on port ${port}`));
