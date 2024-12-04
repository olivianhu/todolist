const express = require('express')
const pg = require('pg');
const cors = require('cors');
const corsOptions = {
  origin: '*', 
  credentials: true,
  methods: ['GET', 'POST', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express()
app.use(cors(corsOptions));
app.use(express.json());

let todos = [];
let todos_ids = [];

async function connectToDatabase() {
  const client = new pg.Client({
    user: 'postgres',
    database: 'todolist',
    password: '00120602',
    port: 5432,
  });

  await client.connect();
  return client;
}

async function insertUserIntoDatabase(name) {
  //create client
  const client = await connectToDatabase();

  const tableName = 'usernames';
  const queryText = 'INSERT INTO ' + tableName + '(username) VALUES($1) ON CONFLICT (username) DO NOTHING;';

  const res = await client.query(queryText, [name]);
  // console.log(res);
  
  //close connection
  await client.end()
}

async function getUserIdByUsername(username) {
  const client = await connectToDatabase();
  // console.log(username);

  const queryText = "SELECT id FROM usernames WHERE username = $1;";
  const res = await client.query(queryText, [username]);
  // console.log(res);

  if (res.rows.length > 0) {
    return res.rows[0].id; 
  } else {
    return null;
  }
}

async function getUsernameByUserID(id) {
  const client = await connectToDatabase();
  // console.log(username);

  const queryText = "SELECT username FROM usernames WHERE id = $1;";
  const res = await client.query(queryText, [id]);

  if (res.rows.length > 0) {
    return res.rows[0].username; 
  } else {
    return null;
  }
}

async function getAllFromDatabase(user) {
  const client = await connectToDatabase();
  const id = await getUserIdByUsername(user);
  // console.log(id);

  const queryText = 'SELECT * FROM todos WHERE user_id = ' + id + ';';
  // const queryText = 'SELECT * FROM todos;';

  const res = await client.query(queryText);
  // console.log(res);
  
  //close connection
  await client.end()
  return res;
}

app.get('/', async (req, res) => {
    const name = req.query.user; 
    const result = await getAllFromDatabase(name);
    // console.log(result.rows);
    
    todos = await Promise.all(
      result.rows.map(async (todo) => {
        const username = await getUsernameByUserID(todo.user_id);
        // console.log()
        return {
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
          user: username
        };
      })
    );
    // console.log(todos);
    // console.log('Todos Sent!');
    res.send(todos)
})

app.post('/login', async (req, res) => {
  const name = req.body['user'];
  // console.log(req.body);
  // console.log(name);
  await insertUserIntoDatabase(name);
  // console.log('name entered!');
});

app.post('/', async (req, res) => {
  const new_todo = req.body;
  todos.push(new_todo);
  todos_ids.push(new_todo.id);
  const client = await connectToDatabase();
  const id = await getUserIdByUsername(new_todo.user);
  // console.log(id);

  const queryText = `
    INSERT INTO todos (id, title, completed, user_id)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (id) DO NOTHING;
  `;
  await client.query(queryText, [new_todo.id, new_todo.title, new_todo.completed || false, id]);
  await client.end();
  res.send("Todo added!");
});

app.post('/toggle', async (req, res) => {
  const id = req.body['id'];

  todos = todos.map(todo => {
    if (todo.id === id) {
      return {
        ...todo,
        completed: !todo.completed
      };
    }
    return todo;
  });

  const client = await connectToDatabase();
  const queryText = "UPDATE todos SET completed = NOT completed WHERE id = $1;";
  await client.query(queryText, [id]);

  await client.end();
  res.send("Todo status toggled!");
});

app.delete('/', async (req, res) => {
  const deleted_todo_id = req.body['id'];
  // console.log(req.body)
  todos = todos.filter(todo => todo.id !== deleted_todo_id);

  const client = await connectToDatabase();
  const queryText = "DELETE FROM todos WHERE id = $1;";
  await client.query(queryText, [deleted_todo_id]);

  await client.end();
  res.send("Todo deleted!");
});



/*
app.listen() uses 3 arguments here.

1st argument: port --> tell the application which port on the host server to listen on for requests/messages
2nd argument: host --> tells the application what URL/website is hosting the server. We could put something like
'google.com' there, but we're putting 'localhost' because that's the internal server that the computer itself hosts,
which is used very often to play around with your software before you deploy it to the cloud.
3rd argument: function --> in the example, this function takes in no arguments, it just logs a message to the terminal
to let us know that our server is running. It can do other things as well. 
*/
const port = 5000
const host = 'localhost'
app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)
})
