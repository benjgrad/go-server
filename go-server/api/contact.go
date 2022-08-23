package api

import (
	"errors"
	"fmt"
	"net/http"
	"net/smtp"

	"github.com/gin-gonic/gin"
)

type loginAuth struct {
	username, password string
}

func LoginAuth(username, password string) smtp.Auth {
	return &loginAuth{username, password}
}

func (a *loginAuth) Start(server *smtp.ServerInfo) (string, []byte, error) {
	return "LOGIN", []byte{}, nil
}

func (a *loginAuth) Next(fromServer []byte, more bool) ([]byte, error) {
	if more {
		switch string(fromServer) {
		case "Username:":
			return []byte(a.username), nil
		case "Password:":
			return []byte(a.password), nil
		default:
			return nil, errors.New("Unkown fromServer")
		}
	}
	return nil, nil
}

func SendEmail(name string, recipient string, innerMessage string, subject string) {
	from := "bengrady4@outlook.com"
	password := "q21wQ@!W"

	// Receiver email address.
	to := []string{
		from, recipient,
	}

	// smtp server configuration.
	smtpHost := "smtp-mail.outlook.com"
	smtpPort := "587"

	// Message.
	message := []byte("From: " + from + "\r\n" +
		"To: " + from + "," + recipient + "\r\n" +
		"Subject: " + subject + "\r\n\r\n" +
		"Hi " + name + ",\r\n\r\n" +
		"You've sent the following message:\r\n\r\n" +
		innerMessage + "\r\n")

	// Authentication.
	auth := LoginAuth(from, password)

	// Sending email.
	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, []byte(message))
	if err != nil {
		fmt.Println(err)
		return
	}
}

// Login is a handler that parses a form and checks for specific data
func Contact(c *gin.Context) {
	//TODO change from postForm to Json
	name := c.PostForm("Name")
	email := c.PostForm("Email")
	subject := c.PostForm("Subject")
	message := c.PostForm("Message")
	SendEmail(name, email, message, subject)
	returnURL := c.DefaultQuery("return_url", "/")
	c.Redirect(http.StatusFound, returnURL)
}
