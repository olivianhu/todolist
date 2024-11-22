import TodoForm from "../components/TodoForm"
import TodoList from "../components/TodoList"

export default function TodoPage( {retrieveTodos, addTodo, todos, removeTodo, toggleComplete}) {
  return(
    <div>
      <h3 style={{ margin: "0", marginTop: "-40px" }}>React Todo</h3>
      <button
        onClick={() => {retrieveTodos()}}
      >Retrieve Past Todos</button>
      <TodoForm 
        addTodo={addTodo}/>
      <TodoList 
        todos={todos} 
        removeTodo={removeTodo}
        toggleComplete={toggleComplete}
      />
    </div>
  )
}