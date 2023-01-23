import { useEffect, useState } from "react";
import ListContent from "./ListContent";
import TaskService from "./TaskService";

const List = () => {
    const [newTask, setNewTask] = useState({
        id: '',
        name: ''
    })
    const [taskList, setTaskList] = useState([])
    
    const getTasks = () => {
        TaskService.getAll().then(res => {
            setTaskList(res.data.data)
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        getTasks()
    }, [])

    const createNewTask = (e) => {
        e.preventDefault()
        let data = {
            id: +newTask.id,
            name: newTask.name
        }
        TaskService.create(data).then(res => {
            setNewTask({
                id: res.data.id,
                name: res.data.name
            })
        }).then(() => {
            getTasks()
            setNewTask({'name': ''})
        }).catch(e => console.log(e))  
        
    }

    const deleteTask = (id) => {
        TaskService.remove(id).then(() => {
            getTasks()
        }).catch(e => console.log(e))
       
    }

    const updateTask = (id, data) => {
        TaskService.update(id, data).then(() => {
            getTasks()
        }).catch(e => console.log(e))
    }

    const handleInput = (e) => {
        const {name, value} = e.target
        setNewTask({...newTask, [name]: value})
    }

    return (
        <div className="list">
            <header className="listHeader">
                <form onSubmit={createNewTask}>
                    <input placeholder="Create new task" 
                        type='text' 
                        id='newTask' 
                        name='name' 
                        value={newTask.name} 
                        required 
                        onChange={handleInput} 
                        className='listInputNewTask' />
                    <button type="submit" className="listButtonNewTask">
                        Create <i className="fas fa-plus"></i>
                    </button>
                </form>
            </header>
            {taskList?.length > 0 ? (
                <ListContent taskList={taskList} onDelete={deleteTask} onUpdate={updateTask}/>
            ) : (
                <div className="emptyList">
                <p>No tasks yet</p>
            </div>
            )}
        </div>
    )
}

export default List;