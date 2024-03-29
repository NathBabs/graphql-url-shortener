require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const schema = require('./schema');
const ShortUrl = require('./models/short');
const connectDB = require('./db/mongoose');

app.use(helmet({
    contentSecurityPolicy: (process.env.NODE_ENV == 'production') ? false : false
}));
app.use(morgan('tiny'));
//app.use(cors);

//connectDB();

app.get("/", (req, res) => {
  res.send(`URL Shortener Service ${new Date()}`);
});

app.use('/graphql', graphqlHTTP({
    schema: schema
    //graphiql: true
}));

app.use('/graphiql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.get('/:id', async (req, res) => {
    const { id: slug } = req.params;
    try {
        const url = await ShortUrl.findOne({
            slug: slug
        });

        if (!url) {
            return res.status(401).send({
                message: "slug not found"
            });
        }

        return res.redirect(url.full);
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = app;