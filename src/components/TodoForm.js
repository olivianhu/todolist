import {useState} from "react";
import {v4 as uuid} from "uuid";

export default function TodoForm({ addTodo }) {
  const [todo, setTodo] = useState({
    id: "",
    task: "",
    completed: false
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (todo.task.trim()) {
      addTodo({...todo, id: uuid()});
      setTodo({...todo, task: ""});
    }
  }

  function handleTaskInputChange(e) {
    setTodo({...todo, task: e.target.value});
  }

  return(
    <form onSubmit={handleSubmit}>
      <input 
        name = "task"
        type = "text"
        value = {todo.task}
        onChange = {handleTaskInputChange}
      />
      <button type="submit">Submit</button>
    </form>
  )
}