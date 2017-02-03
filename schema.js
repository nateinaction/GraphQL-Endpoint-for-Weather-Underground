var GraphQLSchema = require('graphql').GraphQLSchema
var GraphQLObjectType = require('graphql').GraphQLObjectType
var GraphQLString = require('graphql').GraphQLString
var GraphQLList = require('graphql').GraphQLList
var GraphQLInt = require('graphql').GraphQLInt

var fetch = require('node-fetch')

// var apiKey = 'YOUR_API_KEY'
var apiUrl = 'https://api.wunderground.com/api/' + apiKey

var TimeType = new GraphQLObjectType({
  name: 'Time',
  description: 'Forecast time strings',

  fields: () => ({
    hour: {
      type: GraphQLString,
      args: {
        convention: {type: GraphQLString}
      },
      resolve: (data, args) => {
        if (args.convention === '12') {
          return data.civil
        }
        return data.hour + ':00'
      }
    },
    date: {
      type: GraphQLString,
      resolve: (data) => data.mday_padded
    },
    month: {
      type: GraphQLString,
      resolve: (data) => data.mon_padded
    },
    year: {type: GraphQLString},
    pretty: {type: GraphQLString},
    epoch: {type: GraphQLString}
  })
})

var TempType = new GraphQLObjectType({
  name: 'Temperature',
  description: 'fahrenheit or celsius',

  fields: () => ({
    fahrenheit: {
      type: GraphQLInt,
      resolve: (data) => data.english
    },
    celsius: {
      type: GraphQLInt,
      resolve: (data) => data.metric
    }
  })
})

var ForecastType = new GraphQLObjectType({
  name: 'Forecast',
  description: '10-day hourly forecast',

  fields: () => ({
    time: {
      type: TimeType,
      resolve: (data) => data.FCTTIME
    },
    weather: {
      type: GraphQLString,
      resolve: (data) => data.condition
    },
    icon: {type: GraphQLString},
    temp: {
      type: TempType,
      resolve: (data) => data.temp
    },
    chancePrecip: {
      type: GraphQLInt,
      description: 'Chance of precipitation in %',
      resolve: (data) => data.pop
    },
  })
})

var NowType = new GraphQLObjectType({
  name: 'Now',
  description: 'Current conditions',

  fields: () => ({
    weather: {type: GraphQLString},
    icon: {type: GraphQLString},
    temp: {
      type: TempType,
      resolve: (data) => ({
        english: data.temp_f,
        metric: data.temp_c
      })
    },
    location: {
      type: GraphQLString,
      resolve: (location) => location.display_location.full
    }
  })
})

var AlertType = new GraphQLObjectType({
  name: 'Alert',
  description: '...',

  fields: () => ({

  })
})

var QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Nowcast or 10-day hourly forecast',

  fields: () => ({
    now: {
      type: NowType,
      args: {
        lat: {type: GraphQLString},
        lon: {type: GraphQLString},
      },
      resolve: (root, args) => (
        fetch(apiUrl + '/conditions/q/' + args.lat + ',' + args.lon + '.json')
          .then(res => res.json())
          .then(json => json.current_observation)
      )
    },
    forecast: {
      type: new GraphQLList(ForecastType),
      args: {
        lat: {type: GraphQLString},
        lon: {type: GraphQLString},
      },
      resolve: (root, args) => (
        fetch(apiUrl + '/hourly10day/q/' + args.lat + ',' + args.lon + '.json')
          .then(res => res.json())
          .then(json => json.hourly_forecast)
      )
    }
  })
})

module.exports = new GraphQLSchema({
  query: QueryType,
})
