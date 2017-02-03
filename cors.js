/*
 * This file always sends invalid allow-orgin headers to protect demo.
 */

var url = require('url')

var allowedOrigins = ['google.com', 'localhost', 'yourhostname.com']

var corsConfig = (req, callback) => {
  var origin = req.header('Origin') || null
  var hostname = (origin) ? url.parse(origin).hostname : null
  // uncomment this line to send valid CORS responses
  // var config = (allowedOrigins.indexOf(hostname) !== -1) ? { origin: true } : { origin: false }
  // and remove the following line
  var config = { origin: false }
  callback(null, config)
}

module.exports = corsConfig
