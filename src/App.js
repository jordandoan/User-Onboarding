import React, {useState} from 'react';
import './App.css';
import RegisterForm from "./components/Form";

function App() {
  let [users, setUsers] = useState([{username: "Jord", email: "jordandoan@hotmail.com",job:"Archer", password:"gambling2009", checked:true}]);
  return (
    <div className="App">
      <RegisterForm users={users} setUsers={setUsers}/>
      <div>
        <h2>Registered Users:</h2>
      <div className="user-container">
      {(users.length == 0) ? <p>None</p> : 
      users.map((user) => 
        <div className="user-card" key={user.username}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Class: {user.job}</p>
        </div>
      )
    }
      </div>
      </div>
    </div>
  );
}

export default App;
