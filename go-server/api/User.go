package api

import (
	"net/http"
	"strings"

	"github.com/benjgrad/go-server/models"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

// Login is a handler that parses a form and checks for specific data
func Login(c *gin.Context) {
	session := sessions.Default(c)
	//TODO change from postForm to Json

	credentials := models.LoginCredentials{}
	// using BindJson method to serialize body with struct
	if err := c.BindJSON(&credentials); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	username := c.PostForm("username")
	password := c.PostForm("password")
	returnURL := c.DefaultQuery("return_url", "/")

	// Validate form input
	if strings.Trim(username, " ") == "" || strings.Trim(password, " ") == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Parameters can't be empty"})
		return
	}

	// Check the username and password
	user, err := dbInstance.Login(username, password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Authentication failed"})
		return
	}

	// Save the username in the session
	session.Set(userkey, user.Id) // In real world usage you'd set this to the users ID
	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save session"})
		return
	}
	c.Redirect(http.StatusFound, returnURL)
}

func Logout(c *gin.Context) {
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

func Details(c *gin.Context) {
	session := sessions.Default(c)
	user := session.Get(userkey)
	c.JSON(http.StatusOK, gin.H{"user": user})
}

func Status(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "You are logged in"})
}
