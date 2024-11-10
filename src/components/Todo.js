import React from "react";
import { Input } from '@mui/base/Input';
import { Button } from '@mui/base/Button';


export default function Todo({ todo, removeTodo, toggleComplete }) {
  function handleCheckboxClick() {
    toggleComplete(todo.id);
  }

  function handleRemoveClick() {
    removeTodo(todo.id);
  }

  return (
    <div style = {{display: "flex", gap: "5px"}}>
      <Input 
        type = "checkbox" 
        onClick={handleCheckboxClick}
      />
      <li
        style = {{
          color: "white",
          textDecoration: todo.completed ? "line-through" : null
        }}>
          {todo.task}</li>
        <Button 
          style = {{
            padding: "7px",
          }}
          onClick={handleRemoveClick}
        >X</Button>
    </div>
  );

}