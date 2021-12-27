import { useState, useEffect } from "react";
import './App.css';
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users"); // ref to "users" collection in the database
  
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));// "...": spread/get all the fields upto doc.data()
    };

    getUsers();
  }, []);
  
  
  return (
    <div className="App"> 
      {users.map((users) => {
        return (
          <div key={users.id}> 
            {" "} 
            <h1>Name: {users.name}</h1>
            <h1>Age: {users.age}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default App;
