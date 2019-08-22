import React, {useState} from 'react';
import './App.css';
import RegisterForm from "./components/Form";

function App() {
  let [users, setUsers] = useState([]);
  return (
    <div className="App">
      <RegisterForm users={users} setUsers={setUsers}/>
      <div>Registered Users:
      {users.map((user) => 
        <div key={user.username}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      )
    }
    </div>
    </div>
  );
}

export default App;
