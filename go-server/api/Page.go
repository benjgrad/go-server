package api

import (
	"net/http"

	"github.com/benjgrad/go-server/models"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func GetPage(c *gin.Context) {
	session := sessions.Default(c)
	page, err := dbInstance.GetPage(session.Get("user").(int), "/")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	jsonData := []byte(page.Data) //`{"assets":[],"styles":[{"selectors":[{"name":"gjs-row","private":1}],"style":{"display":"table","padding-top":"10px","padding-right":"10px","padding-bottom":"10px","padding-left":"10px","width":"100%"}},{"selectors":[{"name":"gjs-cell","private":1}],"style":{"width":"100%","display":"block"},"mediaText":"(max-width: 768px)","atRuleType":"media"},{"selectors":["gjs-cell30"],"style":{"width":"100%","display":"block"},"mediaText":"(max-width: 768px)","atRuleType":"media"},{"selectors":["gjs-cell70"],"style":{"width":"100%","display":"block"},"mediaText":"(max-width: 768px)","atRuleType":"media"},{"selectors":[{"name":"gjs-cell","private":1}],"style":{"width":"8%","display":"table-cell","height":"75px"}}],"pages":[{"frames":[{"component":{"type":"wrapper","stylable":["background","background-color","background-image","background-repeat","background-attachment","background-position","background-size"],"components":[{"name":"Row","droppable":".gjs-cell","resizable":{"tl":0,"tc":0,"tr":0,"cl":0,"cr":0,"bl":0,"br":0,"minDim":1},"classes":[{"name":"gjs-row","private":1}],"attributes":{"id":"ijuw"},"components":[{"name":"Cell","draggable":".gjs-row","resizable":{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2},"classes":[{"name":"gjs-cell","private":1}]}]}]}}],"id":"Ox1F4UNHpRcWt7Om"}]}`)
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
