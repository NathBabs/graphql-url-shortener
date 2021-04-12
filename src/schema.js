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

/* const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            hello: {
                type: GraphQLString,
                resolve() {
                    return 'world';
                }
            }
        }
    })
}); */
const Objectschema = yup.object().shape({
    url: yup.string().url().required(),
    //slug: yup.string().trim().matches(/[\w\-]/i)
});
const UrlType = new GraphQLObjectType({
    name: 'Url',
    fields: {
      /*   id: {
            type: GraphQLID
        },
        full: {
            type: GraphQLString
        },
        slug: {
            type: GraphQLString
        }, */
        shortenedUrl: {
            type: GraphQLString
        }
    }
});

/* const schema = new GraphQLSchema({
    query: UrlType
}); */

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
                        const url = args.url;
                        await Objectschema.validate({
                            url,
                        });
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
                        console.log(context.headers);
                        console.log(context.headers.referer);
                        const shortenedUrl = `${context.headers.referer}${shortUrl.slug}`;
                        console.log(shortenedUrl);
                        const returnObject = {
                            shortUrl: shortUrl,
                            shortenedUrl: shortenedUrl
                        };
                        return returnObject;
                        //delete shortUrl.id;
                        //console.log();
                        //return ShortUrl.find({}).exec();
                    } catch (error) {
                        return error;
                    }


                }
            }
        }
    })
});

module.exports = schema;