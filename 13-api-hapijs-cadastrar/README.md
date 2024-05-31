# Multi DB

## Alguns comandos Dockers

### --- Postgres

```bash
    $ docker run \
        --name postgres \
        -e POSTGRES_USER=josetvictor \
        -e POSTGRES_PASSWORD=senha \
        -e POSTGRES_DB=db_herois \
        -p 5432:5432 \
        -d \
        postgres
```

```bash
    $ docker ps

    $ docker exec -it postgres /bin/bash

    $ docker run \
        --name adminer \
        -p 8080:8080 \
        --link postgres:postgres \
        -d \
        adminer
```

### --- MONGODB

```bash
    $ docker run \
        --name mongodb \
        -p 27017:27017 \
        -e MONGO_INITDB_ROOT_USERNAME=admin \
        -e MONGO_INITDB_ROOT_PASSWORD=senha \
        -d \
        mongo:4
```

```bash
    $ docker run \
        --name mongoclient \
        -p 3000:3000 \
        --link mongodb:mongodb \
        -d \
        mongoclient/mongoclient

    $ docker exec -it mongodb \
        mongo --host localhost -u admin -p senha -authenticationDatabase admin \
        --eval "db.getSiblingDB('herois').createUser({user: 'josetvictor', pwd: 'senha', roles: [{role: 'readWrite', db: 'herois'}]})"
```