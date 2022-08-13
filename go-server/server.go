package main

import (
	"log"
	"os"

	"github.com/benjgrad/go-server/api"
	"github.com/benjgrad/go-server/db"
	"github.com/gin-gonic/gin"
)

// Thanks to otraore for the code example
// https://gist.github.com/otraore/4b3120aa70e1c1aa33ba78e886bb54f3

func main() {
	dbUser, dbPassword, dbName :=
		os.Getenv("POSTGRES_USER"),
		os.Getenv("POSTGRES_PASSWORD"),
		os.Getenv("POSTGRES_DB")
	database, err := db.Initialize(dbUser, dbPassword, dbName)
	if err != nil {
		log.Fatalf("Could not set up database: %v", err)
	}

	defer database.Conn.Close()

	r := api.Engine(database)

	r.Use(gin.Logger())
	if err := r.Run(":" + os.Getenv("SERVER_PORT")); err != nil {
		log.Fatal("Unable to start:", err)
	}
}
