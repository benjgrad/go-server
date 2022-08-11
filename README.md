# Dockerized Go Server

## Useful commands
### Running the project
``` bash
docker-compose up
```
### Listing docker containers
```bash
docker container list
```
### Entering docker container 
```bash
docker exec -it <CONTAINER ID> /bin/sh
```
### Connecting to PSQL
#### From docker container:
``` bash
psql -p 5432 -U postgres
```