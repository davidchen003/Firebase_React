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
  
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  }

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));// "...": spread/get all the fields upto doc.data()
    };

    getUsers();
  }, []);
  
  
  return (
    <div className="App"> 
      <input placeholder="Name..." onChange={(e) => {
        setNewName(e.target.value);}} />
      <input type="number" placeholder="Age..." onChange={(event) => {
          setNewAge(event.target.value); }} />
      <button onClick={createUser}>Create User</button>

      {users.map((users) => {
        return (
          <div key={users.id}>
            <h1>Name: {users.name}</h1>
            <h1>Age: {users.age}</h1>
            <button onClick={() => {
                updateUser(users.id, users.age);}}
            >
              Increase Age
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
