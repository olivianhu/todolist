import Axios from 'axios'

export default function LoginPage( {setLoggedIn, user, setUser} ) {
  function retrieveUser(user) {
    Axios.post('http://localhost:5000/login',{
      user: user,
    })
    .then(function (response) {
        console.log('response successfully sent, response below')
        console.log(response)
    }).catch(function (error) {
        console.log('response unsuccessfully received, error below')
        console.log(error)
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    retrieveUser(user);
    setLoggedIn(true);
  }

  function handleTaskInputChange(e) {
    setUser(e.target.value);
  }

  return(
    <div>
      <h1 style={{ marginTop: "-80px" }}>Welcome to React Todo</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter your username"
          style={{ height: "20px", width: "200px", marginRight: "5px"}}
          value = {user}
          onChange = {handleTaskInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}