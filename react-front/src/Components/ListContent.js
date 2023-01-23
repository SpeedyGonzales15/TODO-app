import { useState } from "react"
import ListItem from "./ListItem"

const ListContent = ({taskList, onDelete, onUpdate}) => {
    const createdTasks = taskList.length
    const [done, setDone] = useState(0)
    const doneTasks = done

    const remove = (id) => {
        onDelete(id)
    }
    const update = (id, data) => {
        onUpdate(id, data)
    }

    const sortByDone = (list) => {
        let doneList = []
        list.map(item => {
            if (item.isDone === true) {
                doneList.push(item.isDone)
            }
            return item
        })
        setDone(doneList.length)
    }

    return (
        <div className="listContent">
            <header className="listContentHeader">
                <div className="listCreatedTaskCounter">
                    Created tasks
                    <span>{createdTasks}</span>
                </div>
                <div className="listDoneTaskCounter">
                    Done tasks
                    <span>{doneTasks} of {createdTasks}</span>
                </div>
            </header>
            <main className="listItemsContainer">
                {taskList.map(({name, id}) => ( 
                    <ListItem key={id} taskList={taskList} name={name} id={id} onDelete={remove} onUpdate={update} sort={sortByDone}/>
                ))}     
            </main> 
        </div>
    )
}

export default ListContent