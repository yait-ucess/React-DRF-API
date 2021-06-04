import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DrfApiFetch = () => {

  const [tasks, setTasks] = useState([])

  const [selectedTask, setSelectedTask] = useState([])
  const [id, setId] = useState(1)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tasks/',{
      headers: {
        'Authorization': 'Token d5ea6cb5f62cec49f9bb7c0db38b2158fe089b65'
      }
    })
    .then(res => {setTasks(res.data)})
  },[])

  const getTask = () => {
    axios.get(`http://127.0.0.1:8000/api/tasks/${id}/`,{
      headers: {
        'Authorization': 'Token d5ea6cb5f62cec49f9bb7c0db38b2158fe089b65'
      }})
      .then(res => {setSelectedTask(res.data)
    })
  }

  const deleteTask = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`,{
      headers: {
        'Authorization': 'Token d5ea6cb5f62cec49f9bb7c0db38b2158fe089b65'
      }})
      .then(res => {setTasks(tasks.filter(task => task.id !== id)); setSelectedTask([])})
  }


  return (
    <div>
      <ul>
        {
          tasks.map(task => <li key={task.id}> {task.title} {task.id} 
            <button onClick={() => deleteTask(task.id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </li>)

        }
      </ul>

        Set id <br/>
        <input type='text' value={id} onChange={evt => {setId(evt.target.value)}}/>
        <br/>
        <button type='button' onClick={() => getTask()}>Get task</button>
        {/* <button type='button' onClick={() => deleteTask()}>Delete task</button> */}
        <h3>{selectedTask.title} {selectedTask.id}</h3>

    </div>
  )
}

export default DrfApiFetch
