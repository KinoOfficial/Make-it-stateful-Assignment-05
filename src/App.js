import './App.css';
import { Card, Button, Input, Collapse,Select} from 'antd';
// import TaskList from './TaskList';
import React, { useState } from 'react';
function App() {
  //this is used to clear all the list to restore
  // for (let i = 0; i < localStorage.length; i++) {

  //   const key = localStorage.key(i);
  //   if(key.startsWith('task')){
  //     localStorage.removeItem(key);
  //   }
    
  // }
  const { TextArea } = Input;
  const [taskLabel, setTaskLabel] = useState('');
  const [taskContent, setTaskContent] = useState('');

  
  const createTaskList= () => {
    let taskList=[];
    for (let i = 0; i < localStorage.length; i++) {

      const key = localStorage.key(i);
      if(key.startsWith('task')){
  
        const value = JSON.parse(localStorage.getItem(key));
        // console.log(value);
        taskList.push(value);
      }
      
    }
    taskList.sort(function(a,b){
      if (a.taskLabel < b.taskLabel) {
        return -1;
      }
      if (a.taskLabel > b.taskLabel) {
        return 1;
      }
      return 0 
    })
    // console.log('after sort',taskList)
    return taskList;

  }
  // taskList is used to store finish , task label, task content,in the form of object
  // finish:boolean, taskLabel:string, taskContent:string
  const taskList =createTaskList()
  // const [taskList,setTaskList]=useState(createTaskList())
  

  
  //finish button clicked
  const taskFinished = (index,taskList)=>{
    // console.log('Task finished');
    // console.log('deleted after item is ', items)
    // console.log(taskList[index])
    const deletedTask=taskList[index]
    // console.log(deletedTask)
    deletedTask.finish=true
    taskList[index]=true
    // console.log(deletedTask.label)
    localStorage.setItem('task'+deletedTask.taskLabel,JSON.stringify(deletedTask))
    window.location.reload()
  }

  //funtion of creating collapse items
  const createItems = (taskList)=>{
    let key=0
    let items=taskList.map((item,index)=>{
      key++
      if(item.finish){
        return {
            key,
            label: item.taskLabel,
            collapsible:"disabled",
            style:{
              textDecoration:'line-through',
            }
          }
      }
      else{
        return {
            key,
            label: item.taskLabel,
            children: <div>
              
              <div className={'tl_working'}>
                {item.taskContent}
              </div>
              <Button className="mt1rem">Edit</Button>
              <Button onClick={()=>taskFinished(index,taskList)}>finish</Button>
              </div>,
            
          }
        
      }
    })
    return items
    //end of function
  }
  // items is used to store key and label in the form of object to decorate the collapse
  const [items,setItems] =useState(createItems(taskList))
  
  //function of adding new task, when add button is clicked
  const addNewTask= (tl,tc)=>{
    // const task={
      
    // }
    const newTask={
      taskLabel:tl,
      taskContent:tc,
      finish:false
    }
    localStorage.setItem('task'+tl,JSON.stringify(newTask))
    setTaskLabel(tl)
    setTaskContent(tc)
    window.location.reload()
  }

  //funtion of select changing
  const selectChange = (value)=>{
    if(value==='unfinished'){
      const unFinishedTaskList=taskList.filter((value)=>{
        return value.finish===false;
      })
      setItems(createItems(unFinishedTaskList))
    }
    else if(value==='finished'){
      const finishedTaskList=taskList.filter((value)=>{
        return value.finish===true;
      })
      setItems(createItems(finishedTaskList))
    }
    else{
      setItems(createItems(taskList))
    }
  }


  
  //render return 
  console.log('this is render item',items)
  console.log('this is render list',taskList)
  return (
    
    <div className="App">

        <Card style={{width: 300 }} className="card">
        <h1>Task List</h1>

        <Select 
        defaultValue="ShowAll"
        options={[
        {
          value: 'unfinished',
          label: 'Unfinished',
        },
        {
          value: 'finished',
          label: 'Finished',
        },
        {
          value: 'showAll',
          label: 'ShowAll',
        },
      ]} style={{
        width: 120,
      }} className='select' onChange={selectChange}>
        </Select>
        <Collapse accordion items={items} className='mt1rem' />
        <div className="mt1rem">
          <div>
            <span>Please input the task label</span><Input value={taskLabel} onChange={(e) => setTaskLabel(e.target.value)}></Input>
          </div>
          <div className='mt1rem'>
          <span>Please input the task content</span><TextArea rows={4} value={taskContent} onChange={(e) => setTaskContent(e.target.value)}/>
          </div>
          
          <Button onClick={()=>{addNewTask(taskLabel,taskContent)} } className="mt1rem">add a new task</Button>
        </div>
        </Card>
        
      
    </div>
  );
}

export default App;
