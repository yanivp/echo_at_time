
var redis = require("redis");
var client = redis.createClient(
    process.env.REDIS_URL ? process.env.REDIS_URL : 'redis://localhost:6379'
);

// Handles the Redis transaction
function handleTransaction(err, replies){
  try{
    if(err == null){
      var zrangeResults = replies[0];
      for(let i = 0; i < zrangeResults.length; i += 2){
        message = JSON.parse(zrangeResults[i])
        console.log(message.message);
      }
    }
  }
  catch(err){
    console.log("Could not read message, it has been discarded");
  }
  finally{
    setTimeout(
      tick, 
      process.env.BROKER_POLLING_INTERVALS_MS ? process.env.BROKER_POLLING_INTERVALS_MS : 1000
    );
  }
}

// A polling `tick` to Redis
function tick(){
  let min = "-inf";
  let max = Date.now(0);
  client.multi()
    .zrangebyscore("messages", min, max, 'withscores')
    .zremrangebyscore("messages", min, max)
    .exec(handleTransaction);
}

// Start
tick();
console.log("Printer server is up");