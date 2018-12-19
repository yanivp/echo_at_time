# Timed message echo service funxercise
This service uses a simple micro-services architecture with a broker middle-man.
1. The `api_service` is responsible for receiving requests from web-clients.
1. The `broker_service` is simply a broker implemented with `Redis`.
1. The `printer_service` is responsible for printing messages stored at the broker.

## Prerequisites
1. Docker
1. NodeJS / npm
1. Postman (or a similar tool)

## Run the service instances
You might want to run the `docker kill $(docker ps -q)` command before starting to get a clean slate.

### Run the Redis broker
1. Create a terminal and navigate to project root folder.
    1. `cd broker_service`
    1. `docker-compose up`
### Run the printer_service micro-service
1. Create a terminal and navigate to project root folder.
    1. `cd printer_service`
    1. `npm install`
    1. `docker-compose up`
### Run the api_service micro-service
1. Create a terminal and navigate to project root folder.
    1. `cd api_service`
    1. `npm install`
    1. `docker-compose up`
### Create messages
1. Create a new postman request.
    1. `POST`
    1. `http://localhost:8080/echoAtTime`
    1. Headers: `Content-Type` | `application/x-www-form-urlencoded`
    1. Body: 
        1. `message`: Any kind of message you'd like (up to 100 characters).
        1. `when`: When the server should display the message.
            1. Please use this format: `12/19/2018 14:10 GMT+2`
            1. `GMT+2` is important.
1. Click `Send`.
    1. You should see a `{"message":"Message created"}` response
1. The `printer_service` terminal should print your messages at the time you chose.
