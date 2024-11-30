import Todo from "../Todo";

export default function TodoList( {todos, removeTodo, toggleComplete} ) {
  return(
    <div>
      <h5 style={{ margin: '30px 0 10px 0', textAlign: "left", fontSize:"1.25rem", fontWeight: "normal"}}>Tasks:</h5>
      <ul style={{ listStyle: 'none', padding: "0",  margin: '0'}}>
        {todos.map((todo, index) => (
          <Todo 
            key = {index}
            todo={todo} 
            removeTodo={removeTodo}
            toggleComplete={toggleComplete}
          />
        ))}
      </ul>
    </div>
  )
}