import { useState, useEffect } from 'react'
import Navbar from './component/Navbar'
import { RxCross2 } from "react-icons/rx";
import { v4 as uuidv4 } from 'uuid';
import { GiNotebook } from "react-icons/gi";
import { PiPlusBold } from "react-icons/pi";
function App() { 

  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [completed, setCompleted] = useState(true)

useEffect(() => {
  let taskString = localStorage.getItem("tasks")
    if(taskString){
      let tasks = JSON.parse(localStorage.getItem("tasks")) 
      setTasks(tasks)
    }
  }, [])
  
  const saveToLS = (params) => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }

  const toggleCompleted = (e) => {
    setCompleted(!completed)
  }
  
  const deleteHandler= (e, id)=>{  
    let newTasks = tasks.filter(item=>{
      return item.id!==id
    }); 
    setTasks(newTasks) 
    saveToLS()
  }

  const addHandler= ()=>{
    setTasks([...tasks, {id: uuidv4(), task, isCompleted: false}])
    setTask("") 
    saveToLS()
  }
  
  const changeHandler= (e)=>{ 
    setTask(e.target.value)
  }

  const checkboxHandler = (e) => { 
    let id = e.target.name;  
    let index = tasks.findIndex(item=>{
      return item.id === id;
    }) 
    let newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks)
    saveToLS()
  }
  
  return (
    < >
    <Navbar/>
       <div className="App">
        <div className="container">
         <div className="box1">
          <div className="sbox2">
          <h2 className='subheading'>Add your today's Tasks</h2>
          <span className='icon'><GiNotebook /></span>
          </div>
          <div className="sbox">
          <label >
          <input  onChange={changeHandler} value={task} type="text"  className='textadd' />
          </label>
          <button onClick={addHandler} disabled={task.length<=3} className='button'><PiPlusBold /></button>
          </div>
         </div>
         <div className="checkboxalign">
         <input className='checkbox' id='show' onChange={toggleCompleted} type="checkbox" checked={completed} /> 
         <label className='Checkboxtext' htmlFor="show">Tasks Completed!😊</label> 
         </div>
         
         <h2 className='tasktitle'>Your Tasks</h2>
         <div className="tasks">
          {tasks.length ===0 && <div className=''>All tasks are completed😊</div> }
          {tasks.map(item=>{
 
          return (completed || !item.isCompleted) && <div key={item.id} className={"task"}>
            <div className='addtasks'> 
            <input name={item.id} onChange={checkboxHandler} type="checkbox" checked={item.isCompleted} id="checkbox2" />
            <div id='taskcontent' className={item.isCompleted?"line-through":""}>{item.task}</div>
              <button onClick={(e)=>{deleteHandler(e, item.id)}} className='cross'><RxCross2 /></button>
            </div> 
          </div>
          })}
         </div>
         </div>
       </div>
    </>
  )
}

export default App
