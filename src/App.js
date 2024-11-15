import './App.css';
import {useState} from "react";
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Axios from 'axios'

function App() {
  function retrieveTodos() {
    Axios.get('http://localhost:5000/')
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

  function sendTodos(todos) {
    Axios.post('http://localhost:5000/', todos)
    .then(function (response) {
        console.log('response successfully sent, response below')
        console.log(response)
    }).catch(function (error) {
        console.log('response unsuccessfully received, error below')
        console.log(error)
    })
  }

  const[todos, setTodos] = useState([]);

  function addTodo(todo) {
    setTodos([todo, ...todos]);
    sendTodos(todo);
  }

  function removeTodo(id) {
    const newTodos = todos.filter((item) => item.id !== id)
    setTodos(newTodos)
  }
  
  function toggleComplete(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>React Todo</p>
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
      </header>
    </div>
  );
}

export default App;
