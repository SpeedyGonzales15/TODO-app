import http from '../http-common'

const getAll = () => {
    return http.get('/get')
}

const create = data => {
    return http.post('/new', data)
}

const remove = id => {
    return http.delete(`/${id}`)
}

const update = (id, data) => {
    return http.put(`/${id}`, data)
}

const TaskService = {
    getAll,
    create,
    remove,
    update
}

export default TaskService;