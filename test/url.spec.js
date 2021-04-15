const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const expect = chai.expect;
const request = require('supertest');
const {
    urlOne,
    setupDatabase,
    connectDB
} = require('./fixtures/db');

// configure chai
chai.use(chaiHttp);
chai.should();

describe('GraphQL', () => {
    before( () => {
        connectDB();
        //done();
    });
    beforeEach(setupDatabase);

    describe('POST graphql query', () => {
        it('It should throw an errow of invalid url', (done) => {
            let query = {
                query: '{ shortenURL(url: "http://") { shortenedUrl } }'
            };

            chai.request(app).post('/graphql').send(query).end((error, response) => {
                console.log(response.body.data);
                response.body.should.be.a('object');
                response.body.should.have.property('errors');
                response.body.should.have.property('data');
                response.body.data.should.have.property('shortenURL');
                //response.body.data.shortenURL.should.not.exist(null);
                done();
            });
        });

        it('Returns with the shortened url', (done) => {
            let query = {
                query: '{ shortenURL(url: "http://google.com") { shortenedUrl } }'
            };

            chai.request(app).post('/graphql').send(query).end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('data');
                response.body.data.should.have.property('shortenURL');
                response.body.data.shortenURL.should.have.property('shortenedUrl');
                response.body.data.shortenURL.shortenedUrl.should.be.a('string');
                done();
            });
        });

        it('Should return the same shortened link for the same url', (done) => {
            // We are going to use the same url that has been inserted by the beforeEach hook
            // it should return the same shortened link
             let query = {
                query: `{ shortenURL(url: "${urlOne.full}") { shortenedUrl } }`
            };

            chai.request(app).post('/graphql').send(query).end((error, response) => {
                //console.log(response.body);
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('data');
                response.body.data.should.have.property('shortenURL');
                response.body.data.shortenURL.should.have.property('shortenedUrl');
                response.body.data.shortenURL.shortenedUrl.should.be.a('string');
                response.body.data.shortenURL.shortenedUrl.should.eql(`http://nath.link/${urlOne.slug}`);
                done();
            });
        });
    });

});