# RUN IMAGE
docker run -e POSTGRES_PASSWORD=root_password -p 5432:5432 postgres

# list pods
docker ps

# exec pod 
docker exec -it {id} bash

# connect to db first time 
psql -h localhost -U postgres

# create a new database, user and grant provileges 
CREATE DATABASE coopeuch_db;
CREATE USER coopeuch_user WITH PASSWORD 'coopeuch_password';
GRANT ALL PRIVILEGES ON DATABASE coopeuch_db TO coopeuch_user;
GRANT CREATE ON SCHEMA public TO coopeuch_user;
ALTER DATABASE coopeuch_db OWNER TO coopeuch_user;

# connect to new database with new user and password
psql -h 0.0.0.0 -U coopeuch_user -d coopeuch_db -W