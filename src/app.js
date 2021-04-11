const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const PORT = process.env.PORT || 3000;
const connectDB = require('./db/mongoose');

connectDB();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));