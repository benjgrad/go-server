package models

type User struct {
	Id        int    `json:"id"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	CreatedOn string `json:"created_on"`
}

type UserList struct {
	Users []User `json:"users"`
}
