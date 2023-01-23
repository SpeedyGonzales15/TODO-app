Запуск сервера из директории ./cmd
- либо командой go run main.go / go run .
- либо исполняемым бинарным файлом ./todo-app

БД: postgres
database: todo_server
user: postgres
password: postgres

Таблица: 
create table tasks (
    id serial primary key, 
    name text not null
);

React-приложение находится в директории ./react-front