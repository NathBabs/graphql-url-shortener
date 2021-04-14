const os = require("os");
const graphql = require('graphql');
const {
    nanoid
} = require('nanoid');
const mongoose = require('mongoose');
const yup = require('yup');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = graphql;
const ShortUrl = require('./models/short');
const hostName = 'http://nath.link/';

// define the object shape and type with yup so we can validate
const Objectschema = yup.object().shape({
    url: yup.string().url().required()
});
const UrlType = new GraphQLObjectType({
    name: 'Url',
    fields: {
        shortenedUrl: {
            type: GraphQLString
        }
    }
});


const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            shortenURL: {
                type: UrlType,
                args: {
                    url: { type : graphql.GraphQLNonNull(GraphQLString)}
                },
                resolve: async (root, args, context, info) => {
                    try {

                        let shortenedUrl;
                        const url = args.url;

                        //check if it's a valid url
                        await Objectschema.validate({
                            url,
                        });

                        //check if url has been shortened before and return the shortened url
                        const urlExists = await ShortUrl.findOne({
                            full: url
                        });

                        if (urlExists) {
                            return {
                                shortenedUrl: `${hostName}${urlExists.slug}`
                            };
                        }

                        // this condition is to check that the slug has not been generated
                        // and assigned to url before. Although a nanoid generated string is longer than this,
                        // reducing it to 6 increases the chance of collision. Still the possibility is slim
                        let slug = nanoid(6);
                        const check = await ShortUrl.findOne({
                            slug: slug
                        });

                        while (check) {
                            slug = nanoid(6);
                        }

                        const shortUrl = await ShortUrl.create({
                            full: url,
                            slug: slug
                        });
                        
                        shortenedUrl = `${hostName}${shortUrl.slug}`;
                        
                        const returnObject = {
                            shortenedUrl: shortenedUrl
                        };
                        return returnObject;
                    } catch (error) {
                        return error;
                    }
                }
            }
        }
    })
});

module.exports = schema;