# URL Shortener

## This project is hosted on Heroku 🌍🚀, and it's accessible from the following domain

```
http://nath.link
```

### Make requests from your app/postman from ```/graphql``` or from GraphiQL mounted on  at
```
/graphiql
```

Example of requests (made on graphiql from ``` /graphiql```)

```
{
  shortenURL(url: "https://sequelize.org/v3/docs/migrations/"){
    shortenedUrl
  }
}
```

response

```
{
  "data": {
    "shortenURL": {
      "shortenedUrl": "http://nath.link/okkaLZ"
    }
  }
}
```

if an invalid url is passed it returns the following error
```
 "errors": [
    {
      "message": "url must be a valid URL",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "shortenURL"
      ]
    }
  ],
  "data": {
    "shortenURL": null
  }
}
```
To run tests, run the following command
```
$ npm test
```
To start the project run
```
$ npm start
```
or
```
$ npm run dev
````
