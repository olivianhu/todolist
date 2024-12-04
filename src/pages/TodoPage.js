import { useEffect } from "react"
import TodoForm from "../components/TodoForm"
import TodoList from "../components/TodoList"
import Axios from "axios"

export default function TodoPage( {addTodo, todos, setTodos, removeTodo, toggleComplete, user}) {
  useEffect(() => 
    {Axios.get(`http://localhost:5000/?user=${user}`)
      .then(function (response) {
          console.log('response successfully received, response below')
          console.log(response)
  
          // set todos to be response we get from backend
          setTodos(response.data);
      }).catch(function (error) {
          console.log('response unsusccessfully received, error below')
          console.log(error)
      })
    }
  , [user])

  return(
    <div>
      <h3 style={{ margin: "0", marginTop: "-40px" }}>React Todo</h3>
      <TodoForm 
        addTodo={addTodo}
        user={user}
      />
      <TodoList 
        todos={todos} 
        removeTodo={removeTodo}
        toggleComplete={toggleComplete}
      />
    </div>
  )
}