var Hapi = require('hapi')
var twilio = require('twilio')

var server = new Hapi.Server()

server.connection({
  port: process.env.PORT || 8080,
  host: process.env.HOST || '0.0.0.0'
})

server.route({
  method: 'POST',
  path: '/twilio',
  handler: function (request, reply) {
    var resp = new twilio.TwimlResponse()

    resp
    .pause({ length: 2 })
    .say('welcome home', {
      voice: 'woman',
      language: 'en-gb'
    })
    .play('http://jetcityorange.com/dtmf/DTMF-9.mp3', { loop: 2 })
    .hangup()

    reply(resp.toString())
  }
})

server.start(function (err) {
  console.log('Server started at: ' + server.info.uri)
})
