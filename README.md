# GraphQL Endpoint for Weather Underground
### Leave REST behind...

[GraphiQL demo](https://shielded-thicket-68835.heroku.com/graphql)

### Features
- Request current weather data for a location
- Request 10-day hourly forecast for a location

### Example Query
```
{
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
}
```

### Install
1. Clone repository
2. npm install (or [use Yarn!](https://yarnpkg.com/))
3. In schema.js input your api key from [the Weather Underground API](https://www.wunderground.com/weather/api/)
4. npm start index.js

### Learn more about GraphQL
[What is this GraphQL thing anyways?](http://graphql.org/learn/)

[Quick video examples in Python, Ruby, and JS](https://www.youtube.com/watch?v=UBGzsb2UkeY)
