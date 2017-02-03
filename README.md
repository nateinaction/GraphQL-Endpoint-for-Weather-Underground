# GraphQL Endpoint for Weather Underground
### Leave REST behind...

[GraphiQL demo](https://shielded-thicket-68835.heroku.com)

### Features
- Request current weather data for a location
- Request 10-day hourly forecast for a location

### Example Query
`{
  forecast(lat: "40.785091", lon: "-73.968285") {
    time {
      pretty
    }
  	weather
    icon
    temp{
      fahrenheit
    }
    chancePrecip
  }
}`

### Install
1. Clone repository
2. npm install (or use Yarn!)
3. In schema.js input your api key from [the Weather Underground API](https://www.wunderground.com/weather/api/)
4. npm start index.js
