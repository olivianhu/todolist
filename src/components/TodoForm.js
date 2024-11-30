import {useState} from "react";
import {v4 as uuid} from "uuid";

export default function TodoForm({ addTodo, user }) {
  const [todo, setTodo] = useState({
    id: "",
    task: "",
    completed: false,
    user: user
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (todo.task.trim()) {
      addTodo({...todo, id: uuid()});
      setTodo({...todo, task: "", user: user});
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
        style={ {width: "200px"} }
      />
      <button type="submit">Submit</button>
    </form>
  )
}