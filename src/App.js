import './App.css';
import {useState} from "react";
import Axios from 'axios'
import TodoPage from './pages/TodoPage';
import LoginPage from './pages/LoginPage';

function App() {
  function sendTodo(todo) {
    Axios.post('http://localhost:5000/', todo)
    .then(function (response) {
        console.log('response successfully sent, response below')
        console.log(response)
    }).catch(function (error) {
        console.log('response unsuccessfully received, error below')
        console.log(error)
    })
  }

  function toggleTodo(id) {
    Axios.post('http://localhost:5000/toggle', {
        id: id,
    })
    .then(function (response) {
        console.log('response successfully sent, response below')
        console.log(response)
    }).catch(function (error) {
        console.log('response unsuccessfully received, error below')
        console.log(error)
    })
  }

  function deleteTodo(id) {
    Axios.delete('http://localhost:5000/',{
      data: {
        id: id,
      }
    })
    .then(function (response) {
        console.log('response successfully sent, response below')
        console.log(response)
    }).catch(function (error) {
        console.log('response unsuccessfully received, error below')
        console.log(error)
    })
  }

  const[todos, setTodos] = useState([]);
  const[loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  function addTodo(todo) {
    setTodos([todo, ...todos]);
    sendTodo(todo);
  }

  function removeTodo(id) {
    const newTodos = todos.filter((item) => item.id !== id)
    setTodos(newTodos)
    deleteTodo(id)
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
    toggleTodo(id)
  }

  return (
    <div className="App">
      <header className="App-header">
        {loggedIn ? <TodoPage
          addTodo={addTodo}
          todos={todos} 
          setTodos={setTodos}
          removeTodo={removeTodo}
          toggleComplete={toggleComplete}
          user={user}
        /> : <LoginPage 
          setLoggedIn={setLoggedIn}
          user={user}
          setUser={setUser}
        />}
        {/* <TodoPage
          retrieveTodos={retrieveTodos}
          addTodo={addTodo}
          todos={todos} 
          removeTodo={removeTodo}
          toggleComplete={toggleComplete}
          user={user}
        /> */}
      </header>
    </div>
  );
}

export default App;
