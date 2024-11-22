import './App.css';
import {useState} from "react";
import Axios from 'axios'
import TodoPage from './pages/TodoPage';
import LoginPage from './pages/LoginPage';

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
  }

  return (
    <div className="App">
      <header className="App-header">
        {loggedIn ? <TodoPage
          retrieveTodos={retrieveTodos}
          addTodo={addTodo}
          todos={todos} 
          removeTodo={removeTodo}
          toggleComplete={toggleComplete}
        /> : <LoginPage 
          setLoggedIn={setLoggedIn}
        />}
      </header>
    </div>
  );
}

export default App;
