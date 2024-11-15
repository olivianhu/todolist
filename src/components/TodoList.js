import Todo from "./Todo";

export default function TodoList( {todos, removeTodo, toggleComplete} ) {
  return(
    <ul style={{ listStyle: 'none' }}>
      {todos.map((todo, index) => (
        <Todo 
          key = {index}
          todo={todo} 
          removeTodo={removeTodo}
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
  )
}