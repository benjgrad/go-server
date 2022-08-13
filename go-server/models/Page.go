package models

type Page struct {
	Id     int    `json:"id"`
	Name   string `json:"name"`
	UserId int    `json:"user_id"`
	Data   string `json:"data"`
}
