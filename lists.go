package server

// Структуры для чтения/записи

type Tasks struct {
	ID   int    `json:"id" db:"id"`
	Name string `json:"name" db:"name"`
}

type TaskUpdate struct {
	Name *string `json:"name"`
}
