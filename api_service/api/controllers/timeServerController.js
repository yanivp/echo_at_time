'use strict';
const { check, validationResult } = require('express-validator/check');
const uuidv4 = require('uuid/v4');

var redis = require("redis");

var client = redis.createClient(
    process.env.REDIS_URL ? process.env.REDIS_URL : 'redis://localhost:6379'
);

client.on("error", function(err){
    console.log("Redis error" + err)
});

// Echo API endpoint
exports.echoAtTime = function(request, response) {
    console.log("Received a request")

    // Fail on bad input
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({errors: errors.array()});
    }

    // Add a message to the queue
    var whenTimestamp = request.body.when.getTime();
    client.zadd(
        "messages", 
        whenTimestamp, 
        JSON.stringify({
            "uuid": uuidv4(),
            "when": whenTimestamp,
            "message": request.body.message
        }),
        function (err, replies) {
            if(err){
                response.status(500).json({errors: ["Internal server error"]});
            }
            else{
                console.log("Message registered")
                response.status(200).json({'message': 'Message created'});
            }
        }
    );
};