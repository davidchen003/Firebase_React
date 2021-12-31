import { useState, useEffect } from "react";
import './App.css';
import './custom.css';
import { db } from "./firebase-config";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const [users2, setUsers2] = useState([]);
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newDesc, setNewDesc] = useState("");

  const usersCollectionRef = collection(db, "users"); // ref to "users" collection in the database

  
  useEffect(() => {
    const q = query(usersCollectionRef)
    onSnapshot(q, (snapshot) => { 
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    })
    // adding following comment to avoid warning of useEffect missing usersCollectionsRef dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createUser = () => {
    addDoc(usersCollectionRef, { name: newName, desc: newDesc, age: Number(newAge), createdAt: serverTimestamp() })
      .then(() => { //this is optional 
        console.log('new user added!')
      })
  }

  const deleteUser = (id) => {
    const userDoc = doc(db, "users", id);
    deleteDoc(userDoc);
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const getData = () => {
    const q2 = query(usersCollectionRef);
    // const q2 = query(usersCollectionRef, where("age", ">", 9), orderBy("age","desc"))
    // const q2 = query(usersCollectionRef, orderBy("createdAt")) // default is ascending
    getDocs(q2)
    .then((item) => {
      let result = []
      item.docs.forEach((doc) => {
        result.push({...doc.data(), id:doc.id})
      })
      setUsers2(result) // web page update with query result
    })
    .catch(err => { // this is optional
      console.log(err.message)
    })
};

  const onChangeHandler = (text) => {
    let matches = []
    let searchTerms = text.trim().toLowerCase().split(' ') // separate searching words
    if (text.length > 3) { // no action for input < 4 letter
      matches = users.filter(user => {
        return searchTerms.some(term => user.desc.toLowerCase().includes(term))
      })
    }
    setSuggestions(matches)
    setText(text)
  }

  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
  }

  const searchAllHandler = (text) => {
    let matches = []
    let searchTerms = text.trim().toLowerCase().split(' ') // separate searching words
    matches = users.filter(user => {
        return searchTerms.every(term => user.desc.toLowerCase().includes(term))
      })
    setSuggestions(matches)
  }

  return (
    <div className="App"> 
      <input placeholder="Name..." onChange={(e) => {
        setNewName(e.target.value);}} />
      <input placeholder="Desc..." onChange={(event) => {
        setNewDesc(event.target.value); }} />
      <input type="number" placeholder="Age..." onChange={(event) => {
        setNewAge(event.target.value); }} />
      <button onClick={createUser}>Create User</button>
      <button onClick={getData}>Get Query/Data</button>
      {users2.map((user) => {
        return (
          <div key={user.id}>
            <h2>Name: {user.name}</h2>
            <h2>Desc: {user.desc}</h2>
            <h2>Age: {user.age}</h2>
            <button onClick={() => {updateUser(user.id, user.age);}}>
              Increase Age
            </button>
            <button onClick={() => {deleteUser(user.id);}}>
              Delete User
            </button>
          </div>
        );
      })}
      <hr />
      <div>this is your input: {text}</div>
      <div>
          <button onClick = {() => searchAllHandler(text)}>
            Click for suggestions contain ALL the searching words
          </button>
      </div>
      <input type="text" className = "col-md-12" style= {{marginTop: 10}}
        onChange = {e => onChangeHandler(e.target.value)}
        />
      {suggestions && suggestions.map((suggestion,i) => 
        <div key = {i} className="suggestion col-md-12 justify-content-md-center" 
        onClick={() => onSuggestHandler(suggestion.desc)}>
          {suggestion.desc}
        </div>
      )}
    </div>
  );
}

export default App;
