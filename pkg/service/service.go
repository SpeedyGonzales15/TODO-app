package service

import (
	"rest-server"
	"rest-server/pkg/repository"
)

type TaskLsit interface {
	Create(list server.Tasks) (int, error)
	GetAll() ([]server.Tasks, error)
	Delete(id int) error
	Update(id int, input server.TaskUpdate) error
}

type Service struct {
	TaskLsit
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		TaskLsit: NewTaskItemList(repos.TaskLsit),
	}
}
