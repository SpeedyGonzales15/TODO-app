package repository

import (
	"fmt"
	server "rest-server"
	"strings"

	"github.com/jmoiron/sqlx"
	"github.com/sirupsen/logrus"
)

type TaskListPostgres struct {
	db *sqlx.DB
}

func NewTaskPostgres(db *sqlx.DB) *TaskListPostgres {
	return &TaskListPostgres{db: db}
}

func (r *TaskListPostgres) Create(list server.Tasks) (int, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return 0, nil
	}

	var dataId int
	createDataQuery := fmt.Sprintf("insert into %s (name) values ($1) returning id", taskTable)
	row := tx.QueryRow(createDataQuery, list.Name)
	err = row.Scan(&dataId)
	if err != nil {
		tx.Rollback()
		return 0, err
	}

	return dataId, tx.Commit()
}

func (r *TaskListPostgres) GetAll() ([]server.Tasks, error) {
	var list []server.Tasks

	query := fmt.Sprintf("select * from %s", taskTable)
	err := r.db.Select(&list, query)

	return list, err
}

func (r *TaskListPostgres) Delete(id int) error {
	query := fmt.Sprintf("delete from %s where id = $1", taskTable)
	_, err := r.db.Exec(query, id)

	return err
}

func (r *TaskListPostgres) Update(id int, input server.TaskUpdate) error {
	setValues := make([]string, 0)
	args := make([]interface{}, 0)
	argId := 1

	if input.Name != nil {
		setValues = append(setValues, fmt.Sprintf("name=$%d", argId))
		args = append(args, *input.Name)
		argId++
	}

	setQuery := strings.Join(setValues, ", ")

	query := fmt.Sprintf("update %s set %s where id = $%d", taskTable, setQuery, argId)
	args = append(args, id)

	logrus.Debugf("updateQuery: %s", query)
	logrus.Debugf("args: %s", args)

	_, err := r.db.Exec(query, args...)
	return err
}
