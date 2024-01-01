import React, { Fragment, useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: ""
  })

  const InputHandler = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }));
  }

  const [message, setMessage] = useState(null);
  const Login = async (e) => {
    e.preventDefault()
    const { name, email, password } = input;

    if (name && email && password) {
      const res = await fetch("https://react-firebase-271be-default-rtdb.firebaseio.com/reactfirebaselogin.json", {
        method: "POST",
        headers: { "content-type": "application/json", },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })
      if (res.ok) {
        setMessage("Login successful!");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setInput({
          name: "",
          email: "",
          password: ""
        })
      } else {
        setMessage("Login failed. Please try again.");
      }
    } else {
      setMessage("Please fill All the fields")
    }
  }

  return (
    <Fragment>
      <form >
        Name:<input required name='name' onChange={InputHandler} placeholder='Enter your name' type='text' value={input.name}></input><br />
        Email:<input required name='email' onChange={InputHandler} placeholder='Enter your Email' type='email' value={input.email} ></input><br />
        Password:<input required name='password' onChange={InputHandler} placeholder='Enter your Password' type="current-password" value={input.password} /><br />
        <button onClick={Login}>Login</button>
        {message && <div className="message">{message}</div>}
      </form>
    </Fragment>
  );
}

export default App;