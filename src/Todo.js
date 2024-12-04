import React from "react";


export default function Todo({ todo, removeTodo, toggleComplete }) {
  function handleCheckboxClick() {
    toggleComplete(todo.id);
  }

  function handleRemoveClick() {
    removeTodo(todo.id);
  }


  return (
    <div style = {{display: "flex", gap: "10px", alignItems: "center", justifyContent: "space-between"}}>
      <div style = {{display: "flex", gap: "5px", alignItems: "center"}}> 
      <input 
        type = "checkbox" 
        onChange={handleCheckboxClick}
        checked={todo.completed}
      />
      
      <li
        style = {{
          color: "white",
          textDecoration: todo.completed ? "line-through" : null,
          fontSize: "20px",
          marginBottom: "3px"
        }}>
          {todo.title}</li>
        </div>
        <button 
          style = {{
            borderRadius: "5px",
            border: "none",
            padding:"0 5px",
            height: "18px",
          }}
          onClick={handleRemoveClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style = {{
            width: '8px',
            height: '8px',
          }}>
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>

        </button>
    </div>
  );

}