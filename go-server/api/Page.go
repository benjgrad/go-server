package api

import (
	"fmt"
	"net/http"

	"github.com/benjgrad/go-server/models"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func GetPage(c *gin.Context) {
	session := sessions.Default(c)
	pageName := c.Param("name")
	fmt.Println(pageName)
	if pageName == "" {
		pageName = "/"
	}
	page, err := dbInstance.GetPage(session.Get("user").(int), pageName)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	jsonData := []byte(page.Data)
	c.Data(http.StatusOK, "application/json", jsonData)
	return
}

func SetPage(c *gin.Context) {
	page := models.Page{}
	// using BindJson method to serialize body with struct
	if err := c.BindJSON(&page); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	session := sessions.Default(c)
	page.UserId = session.Get("user").(int)
	page.Name = c.Param("name")
	if page.Name == "" {
		page.Name = "/"
	}
	if err := dbInstance.SetPage(page); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, &page)
	return
}
