# Go Server
This is a demo go server with basic authentication and data storage for a simple webpage. It serves a static webpage (index.html) that uses the `POST /login` and `GET /user/status` endpoints before saving, and sends data to the `POST /page` endpoint when saving. On page load, data is loaded from the `GET /page` endpoint.

## Running the project

To start the server, run the following command in the root project directory:
``` bash
go run server.go
```
This will serve the api and the server over port 8549. 
## Future Development
- Allow user signup
- Use DB to login
- Configure auth secrets
- Allow multiple pages per user