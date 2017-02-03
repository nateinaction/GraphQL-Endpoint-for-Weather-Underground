var express = require('express')
var cors = require('cors')
var graphql = require('graphql')
var graphQLHTTP = require('express-graphql')

var corsConfig = require('./cors')
var schema = require('./schema')

var app = express()

app.use('/graphql', cors(corsConfig), graphQLHTTP({
  schema,
  graphiql: true
}))

app.listen(process.env.PORT || 5000)
