const express = require('express')
const pg = require('pg');
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

const app = express()
app.use(cors(corsOptions));
app.use(express.json());

let todos = [];

async function insertIntoDatabase(name) {
  //create client
  const client = new pg.Client({
      user: 'postgres',
      database: 'todolist',
      password: '00120602', 
      port: 5432,
  });

  //connect client
  await client.connect()
  // console.log(name);

  const tableName = 'usernames';
  const queryText = 'INSERT INTO ' + tableName + '(name) VALUES($1)';

  const res = await client.query(queryText, [name]);
  // console.log(res);
  
  //close connection
  await client.end()
}

app.get('/', (req, res) => {
    console.log('Todos Sent!')
    res.send(todos)
})

app.post('/login', async (req, res) => {
  const name = req.body['user'];
  console.log(req.body);
  console.log(name);
  await insertIntoDatabase(name);
  console.log('name entered!');
});

app.post('/', (req, res) => {
  const new_todo = req.body;
  todos.push(new_todo);
  res.send("Todo posted!");
});

app.delete('/', (req, res) => {
  const deleted_todo_id = req.body['id'];
  console.log(req.body)
  todos = todos.filter(todo => todo.id !== deleted_todo_id);
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
