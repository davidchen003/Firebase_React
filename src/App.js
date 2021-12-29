import { useState, useEffect } from "react";
import './App.css';
import { db } from "./firebase-config";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  getDocs
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

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };
  
  useEffect(() => {
    const q = query(usersCollectionRef)
    onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    })
    // adding following comment to avoid warning of useEffect missing usersCollectionsRef dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // loading data from local JSON file and input into firebase
  const loadData = () => {
    const data = require('./MOCK_DATA.json');
    data.map((datum) => ( // using () instead of {} to avoid error message of Arrow function needing return
      addDoc(usersCollectionRef, { name: datum.first_name, age: (("age" in datum) ? datum.age : null) })
    ))
  }

  // reading data from firebase
  const getData = async() => {
      const data = await getDocs(usersCollectionRef);
      const result = data.docs.map((doc) => ({...doc.data()}))
      console.log(result)
    };

  const testFun = () => {
    const result = ((4 > 5) ? "OK" : "null")
    console.log(result)
  }

  return (
    <div className="App"> 
      <input placeholder="Name..." onChange={(e) => {
        setNewName(e.target.value);}} />
      <input type="number" placeholder="Age..." onChange={(event) => {
          setNewAge(event.target.value); }} />
      <button onClick={createUser}>Create User</button>
      <button onClick={loadData}>Load Data</button>
      <button onClick={getData}>Get Data</button>
      <button onClick={testFun}>Test</button>

      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button onClick={() => {
                updateUser(user.id, user.age);}}
            >
              Increase Age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);}}
            >
              Delete User
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
