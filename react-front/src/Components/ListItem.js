import { useState } from "react"

const ListItem = ({name, id, onDelete, onUpdate, sort, taskList}) => { 
    const handleRemove = (id) => {
        onDelete(id)
    }

    const handleUpdate = (id, data) => {
        onUpdate(id, data)
    }

    const [editable, setEditable] = useState(-1)
    const [newTaskName, setNewTaskName] = useState({
        name: '',
    })
    const [isDone, setIsDone] = useState(true)
    const [listCopy, setListCopy] = useState([...taskList])
    
    const handleDone = () => {
        const match = listCopy.map(item => {
            if (item.id === id) {
                item.isDone = isDone
            }
            return item
        })
        setListCopy(match)
    }

    const handleSort = (list) => {
        sort(list)
    }

    return (
        <div className="listItem">
            {editable === id ? (
                <>
                    <input onChange={(e) => setNewTaskName({'name': e.target.value})} />
                    <span className="listItemEditButton"  onClick={() => {setEditable(-1)
                    handleUpdate(id, newTaskName)}}>
                        <i className="fas fa-check" />
                    </span>
                    <span className="listItemDeleteButton"  onClick={() => {setEditable(-1)
                    setNewTaskName({'name': ''})}}>
                        <i className="fas fa-ban" />
                    </span>
                </>
            ) : (
                <>
                <button className={isDone ? "listItemToggle" : "listItemToggleSelected"} onClick={() => {setIsDone(!isDone)
                handleDone()
                handleSort(listCopy)}}>
                    {isDone ? null : <i className="fas fa-check" />}
                </button>
            <p className={isDone ? "listItemText" : "listItemTextSelected"}>{name}</p>
            <span className="listItemDeleteButton" onClick={() => handleRemove(id)}>
                <i className="fas fa-trash"></i>
            </span>
            <span className="listItemEditButton" onClick={() => setEditable(id)}>
                <i className="fas fa-edit"></i>
            </span>
            </>
            )}
        </div>
    )
}

export default ListItem