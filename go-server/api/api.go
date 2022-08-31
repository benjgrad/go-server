package api

import (
	"net/http"
	"os"

	"github.com/benjgrad/go-server/db"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

var dbInstance db.Database

const userkey = "user"

var secret = []byte(os.Getenv("AUTH_SECRET"))

func Engine(db db.Database) *gin.Engine {
	r := gin.New()
	dbInstance = db
	// Setup the cookie store for session management
	r.Use(sessions.Sessions("mysession", cookie.NewStore(secret)))
	r.Use(static.ServeRoot("/", "./static"))
	// Login and logout routes
	r.POST("/login", Login)
	r.GET("/logout", Logout)

	r.POST("/contact", Contact)
	r.POST("/asset", SaveFileHandler)

	// Private group, require authentication to access
	userCollection := r.Group("/user")
	userCollection.Use(AuthRequired)
	{
		userCollection.GET("/", Details)
		userCollection.GET("/status", Status)
	}

	// Page collection
	pageCollection := r.Group("/page")
	pageCollection.Use(AuthRequired)
	{
		pageCollection.GET("", GetPage)
		pageCollection.POST("", SetPage)
		pageCollection.GET("/:name", GetPage)
		pageCollection.POST("/:name", SetPage)
	}
	return r
}

// AuthRequired is a simple middleware to check the session
func AuthRequired(c *gin.Context) {
	session := sessions.Default(c)
	user := session.Get(userkey)
	if user == nil {
		// Abort the request with the appropriate error code
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}
	// Continue down the chain to handler etc
	c.Next()
}
