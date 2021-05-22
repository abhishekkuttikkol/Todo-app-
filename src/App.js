import './App.css';
import {useEffect, useState} from 'react'
import Todo from './Todo';
import { Button, TextField } from '@material-ui/core'
import db from './firebase'
import firebase from 'firebase'

function App() {
  const [Todos,setTodos] = useState([])
  const [input,setInput] = useState('')
  console.log(input)

  useEffect(()=>{
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, [])

  const addTodo = (event)=>{
    event.preventDefault()
    db.collection('todos').add({
      todo : input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
  }

  return (
    <div className="App">
      <h1>TODO List</h1>
      <form>
      <TextField value={input} onChange={event => setInput(event.target.value)} id="standard-basic" label="Write a TODO" />
      {/* <input value={input} onChange={event => setInput(event.target.value)} /> */}
      <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
        Add TODO
      </Button>
      {/* <button type="submit" onClick={addTodo}>Add TODO</button> */}
      </form>
      <ul>
        {Todos.map(todo =>(
          <Todo todo={todo}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
