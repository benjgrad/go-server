# Go Server
This is a demo go server with basic authentication and data storage for a simple webpage. It serves a static webpage (index.html) and some static icons, as well as handles the REST requests below. 

The API and static pages are served over port 8549 (specified in the .env file). The docker compose file will spin up a dockerized instance of Postgres, with config values in the .env file, which is shared between docker containers.

### Endpoints
- `POST /login`
    - Handles login requests and stores session to cookie
- `GET /user/status`
    - Returns whether or not the user is logged in
- `POST /page`
    - Saves the page data to the db
- `GET /page`
    - Returns the saved page data to be loaded by the frontend

## Future Development
- Allow user signup
- ~~Use DB to login~~
- Configure auth secrets
- Allow multiple pages per user
- Handle updates to the db schema on startup
- Hash user passwords

## Docker

## Useful commands
### Running the project
``` bash
docker-compose up --build
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