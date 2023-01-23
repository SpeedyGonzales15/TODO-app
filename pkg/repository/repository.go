package repository

import (
	"rest-server"

	"github.com/jmoiron/sqlx"
)

type TaskLsit interface {
	Create(list server.Tasks) (int, error)
	GetAll() ([]server.Tasks, error)
	Delete(id int) error
	Update(id int, input server.TaskUpdate) error
}

type Repository struct {
	TaskLsit
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		TaskLsit: NewTaskPostgres(db),
	}
}
