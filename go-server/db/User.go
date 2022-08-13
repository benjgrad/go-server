package db

import (
	"database/sql"

	"github.com/benjgrad/go-server/models"
)

/// Undecided on this approach -- this encourages many small queries instead of large ones,
/// which has a negative impact on performance. In many-to-many db relationships, new models
/// and accessors could be built, but that would decouple the code model from the go model,
/// making code maintenance/reuse more difficult.

func (db Database) Login(username string, password string) (models.User, error) {
	user := models.User{}
	query := `
	SELECT 
	user_id as Id, 
	Username, 
	Password, 
	Email, 
	Created_on as CreatedOn
	FROM users 
	WHERE username = $1
	AND password = $2;`
	row := db.Conn.QueryRow(query, username, password)
	switch err := row.Scan(&user.Id, &user.Username, &user.Password, &user.Email, &user.CreatedOn); err {
	case sql.ErrNoRows:
		return user, ErrNoMatch
	default:
		return user, err
	}
}

func (db Database) GetAllUsers() (*models.UserList, error) {
	list := &models.UserList{}
	rows, err := db.Conn.Query(`
	SELECT 
	user_id as Id, 
	Username, 
	Password, 
	Email, 
	Created_on as CreatedOn 
	FROM Users ORDER BY Id DESC`)
	if err != nil {
		return list, err
	}
	for rows.Next() {
		var User models.User
		err := rows.Scan(&User.Id, &User.Username, &User.Password, &User.Email, &User.CreatedOn)
		if err != nil {
			return list, err
		}
		list.Users = append(list.Users, User)
	}
	return list, nil
}
func (db Database) AddUser(User *models.User) error {
	var id int
	var createdAt string
	query := `INSERT INTO users (username, password, email, createdOn) VALUES ($1, $2, $3, NOW()) RETURNING id, created_on`
	err := db.Conn.QueryRow(query, User.Username, User.Password, User.Email).Scan(&id, &createdAt)
	if err != nil {
		return err
	}
	User.Id = id
	User.CreatedOn = createdAt
	return nil
}
func (db Database) GetUserByUserName(username string) (models.User, error) {
	user := models.User{}
	query := `
	SELECT 
	user_id as Id, 
	Username, 
	Password, 
	Email, 
	Created_on as CreatedOn
	FROM users WHERE username = $1;`
	row := db.Conn.QueryRow(query, username)
	switch err := row.Scan(&user.Id, &user.Username, &user.Password, &user.Email, &user.CreatedOn); err {
	case sql.ErrNoRows:
		return user, ErrNoMatch
	default:
		return user, err
	}
}
func (db Database) DeleteUser(userId int) error {
	query := `DELETE FROM users WHERE id = $1;`
	_, err := db.Conn.Exec(query, userId)
	switch err {
	case sql.ErrNoRows:
		return ErrNoMatch
	default:
		return err
	}
}
func (db Database) UpdateUser(userId int, userData models.User) (models.User, error) {
	user := models.User{}
	query := `UPDATE users SET username=$1, password=$2, email=$3 WHERE id=$4 RETURNING id, username, password, created_on;`
	err := db.Conn.QueryRow(query, userData.Username, userData.Password, userData.Email, userId).Scan(&user.Id, &user.Username, &user.Password, &user.CreatedOn)
	if err != nil {
		if err == sql.ErrNoRows {
			return user, ErrNoMatch
		}
		return user, err
	}
	return user, nil
}
