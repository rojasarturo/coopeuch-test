# TO RUN LOCALLY
./mvnw spring-boot:run

# TO RUN TEST
./mvnw test

# EXAMPLE APIs
## GET
```
curl --location 'http://localhost:8080/task'
```

## POST
```
url --location 'http://localhost:8080/task' \
--header 'Content-Type: application/json' \
--data '{
    "description": "hola"
}'
```
## PUT
```
curl --location --request PUT 'http://localhost:8080/task' \
--header 'Content-Type: application/json' \
--data '{
    "id": 30,
    "description": "hola 3",
    "active": false
}'

### DELETE
```

```
curl --location --request DELETE 'http://localhost:8080/task?id=31'
```