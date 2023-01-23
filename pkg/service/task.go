package service

import (
	server "rest-server"
	"rest-server/pkg/repository"
)

type TaskItemList struct {
	repo repository.TaskLsit
}

func NewTaskItemList(repo repository.TaskLsit) *TaskItemList {
	return &TaskItemList{repo: repo}
}

func (s *TaskItemList) Create(list server.Tasks) (int, error) {
	return s.repo.Create(list)
}

func (s *TaskItemList) GetAll() ([]server.Tasks, error) {
	return s.repo.GetAll()
}

func (s *TaskItemList) Delete(id int) error {
	return s.repo.Delete(id)
}

func (s *TaskItemList) Update(id int, input server.TaskUpdate) error {
	return s.repo.Update(id, input)
}
