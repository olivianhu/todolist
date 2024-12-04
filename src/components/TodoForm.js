import {useState} from "react";
import {v4 as uuid} from "uuid";

export default function TodoForm({ addTodo, user }) {
  const [todo, setTodo] = useState({
    id: "",
    title: "",
    completed: false,
    user: user
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (todo.title.trim()) {
      addTodo({...todo, id: uuid()});
      setTodo({...todo, title: "", user: user});
    }
  }

  function handletitleInputChange(e) {
    setTodo({...todo, title: e.target.value});
  }

  return(
    <form onSubmit={handleSubmit}>
      <input 
        name = "title"
        type = "text"
        value = {todo.title}
        onChange = {handletitleInputChange}
        style={ {width: "200px"} }
      />
      <button type="submit">Submit</button>
    </form>
  )
}