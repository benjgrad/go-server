package db

import (
	"database/sql"

	"github.com/benjgrad/go-server/models"
)

/// Undecided on this approach -- this encourages many small queries instead of large ones,
/// which has a negative impact on performance. In many-to-many db relationships, new models
/// and accessors could be built, but that would decouple the code model from the go model,
/// making code maintenance/reuse more difficult.

func (db Database) GetPage(userId int, pageName string) (models.Page, error) {
	page := models.Page{}
	query := `
	SELECT 
	page_id as Id, 
	Name, 
	user_id as UserId, 
	Data
	FROM pages 
	WHERE user_id = $1
	AND Name = $2;`
	row := db.Conn.QueryRow(query, userId, pageName)
	switch err := row.Scan(&page.Id, &page.Name, &page.UserId, &page.Data); err {
	case sql.ErrNoRows:
		return page, ErrNoMatch
	default:
		return page, err
	}
}

func (db Database) SetPage(pageData models.Page) error {
	page := models.Page{}
	query := `
	INSERT INTO pages (Name, user_id, data)
	VALUES($1, $2, $3) 
	ON CONFLICT ON CONSTRAINT UC_pages_name_userid
	DO 
   		UPDATE SET data = $3
	RETURNING page_id as Id, name, user_id as UserId;
	`
	err := db.Conn.QueryRow(query, pageData.Name, pageData.UserId, pageData.Data).Scan(&page.Id, &page.Name, &page.UserId)

	if err != nil {
		if err == sql.ErrNoRows {
			return ErrNoMatch
		}
		return err
	}
	return nil
}
