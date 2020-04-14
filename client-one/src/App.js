/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';
import './App.css';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

const GET_USERS = gql`
  {
    users {
      username
      code
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser($username: String!, $code: String!) {
    addUser(username: $username, code: $code) {
      username
      code
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [addTodo] = useMutation(ADD_USER);

  const [username, setUserName] = useState("");
  const [code, setCode] = useState("");

  if (loading) return 'Loading users ...';
  if (error) return `Error at loading users! ${error.message}`;

  const handleUsernameChange = e => {
    setUserName(e.target.value);
  };
  const handleCodeChange = e => {
    setCode(e.target.value);
  };

  return (
    <div className="App">

      <h1>Learn Apollo</h1>

      <div className="ListUser">
        <p>List users: </p>
        {data.users.map(user => (
          <p key={user.code}>{user.username}  |  {user.code}</p>
        ))}
      </div>

      <form
        className="ListUser"
        onSubmit={e => {
          addTodo({ variables: { username: username, code: code } });
        }}
      >
        <label>Username:</label>
        <br/>
        <input type="text" id="username" name="username" onChange={handleUsernameChange}/>
        <br/>
        
        <label>Code:</label>
        <br/>
        <input type="text" id="code" name="code" onChange={handleCodeChange}/>
        <br/><br/>
        
        <input type="submit" value="Submit"/>
      </form> 

    </div>
  );
}

export default App;