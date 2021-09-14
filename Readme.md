# URL Shortener

## This project is hosted on Heroku 🌍🚀, and it's accessible from the following domain

```
http://nath.link
```
## Running the project

1. Clone repository 
    ```
    $ git clone https://github.com/NathBabs/graphql-url-shortener.git
    ```
2. cd into the project directory

3. Run the following command to install dependencies.
    ``` 
    npm install
    ``` 

4. Add the following environment variables to your ```.env``` file in the root of your project.
    * MONGODB_URI
    * MONGODB_TEST_URI
    * PORT

5. Run the project with 
    ```
    $ npm start
    ``` 
    or 
    ```
    $ npm run dev
    ```

6. To run the tests, run 
    ```
    $ npm test
    ```
<br>
<br>

### Make requests from your app or postman from ```/graphql``` endpoint or from GraphiQL mounted on  at
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
