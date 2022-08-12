package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
)

const userkey = "user"

var secret = []byte("secret")

// Thanks to otraore for the code example
// https://gist.github.com/otraore/4b3120aa70e1c1aa33ba78e886bb54f3

func main() {
	r := engine()

	r.Use(gin.Logger())
	if err := engine().Run(":8459"); err != nil {
		log.Fatal("Unable to start:", err)
	}
}

func engine() *gin.Engine {
	r := gin.New()

	// Setup the cookie store for session management
	r.Use(sessions.Sessions("mysession", sessions.NewCookieStore(secret)))
	r.Use(static.Serve("/", static.LocalFile("./static", true)))

	// Login and logout routes
	r.POST("/login", login)
	r.GET("/logout", logout)

	// Private group, require authentication to access
	userCollection := r.Group("/user")
	userCollection.Use(AuthRequired)
	{
		userCollection.GET("/", me)
		userCollection.GET("/status", status)
	}

	// Page collection
	pageCollection := r.Group("/page")

	pageCollection.Use(AuthRequired)
	{
		pageCollection.GET("", getPage)
		pageCollection.POST("", getPage)
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

// login is a handler that parses a form and checks for specific data
func login(c *gin.Context) {
	session := sessions.Default(c)
	//TODO change from postForm to Json
	username := c.PostForm("username")
	password := c.PostForm("password")
	returnURL := c.DefaultQuery("return_url", "/")

	// Validate form input
	if strings.Trim(username, " ") == "" || strings.Trim(password, " ") == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Parameters can't be empty"})
		return
	}

	// Check for username and password match, usually from a database
	if username != "hello" || password != "itsme" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication failed"})
		return
	}

	// Save the username in the session
	session.Set(userkey, username) // In real world usage you'd set this to the users ID
	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save session"})
		return
	}
	c.Redirect(http.StatusFound, returnURL)
}

func logout(c *gin.Context) {
	session := sessions.Default(c)
	user := session.Get(userkey)
	if user == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid session token"})
		return
	}
	session.Delete(userkey)
	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save session"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Successfully logged out"})
}

func me(c *gin.Context) {
	session := sessions.Default(c)
	user := session.Get(userkey)
	c.JSON(http.StatusOK, gin.H{"user": user})
}

func status(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "You are logged in"})
}

func getPage(c *gin.Context) {
	fmt.Println("Get page data")
	jsonData := []byte(`{"assets":[],"styles":[{"selectors":[{"name":"gjs-row","private":1}],"style":{"display":"table","padding-top":"10px","padding-right":"10px","padding-bottom":"10px","padding-left":"10px","width":"100%"}},{"selectors":[{"name":"gjs-cell","private":1}],"style":{"width":"100%","display":"block"},"mediaText":"(max-width: 768px)","atRuleType":"media"},{"selectors":["gjs-cell30"],"style":{"width":"100%","display":"block"},"mediaText":"(max-width: 768px)","atRuleType":"media"},{"selectors":["gjs-cell70"],"style":{"width":"100%","display":"block"},"mediaText":"(max-width: 768px)","atRuleType":"media"},{"selectors":[{"name":"gjs-cell","private":1}],"style":{"width":"8%","display":"table-cell","height":"75px"}}],"pages":[{"frames":[{"component":{"type":"wrapper","stylable":["background","background-color","background-image","background-repeat","background-attachment","background-position","background-size"],"components":[{"name":"Row","droppable":".gjs-cell","resizable":{"tl":0,"tc":0,"tr":0,"cl":0,"cr":0,"bl":0,"br":0,"minDim":1},"classes":[{"name":"gjs-row","private":1}],"attributes":{"id":"ijuw"},"components":[{"name":"Cell","draggable":".gjs-row","resizable":{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2},"classes":[{"name":"gjs-cell","private":1}]}]}]}}],"id":"Ox1F4UNHpRcWt7Om"}]}`)
	c.Data(http.StatusOK, "application/json", jsonData)
}
