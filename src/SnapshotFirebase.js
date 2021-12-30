import React, { useEffect, useState} from "react";
import { db } from "./firebase-config";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const ref = collection(db, "schools")
  
  //method 1: real time (web page update automatically when firebase udpates)
  function getSchools() {
    setLoading(true);
    onSnapshot(query(ref),(querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      })
      setSchools(items);
      setLoading(false);
    });
  }

  // ADD FUNCTION
    const addSchool = async() => {
    await addDoc(ref, { title:title, desc: desc});
    }

  useEffect(() => {
    getSchools();
  }, []);

  if (loading) {
    return <h1>Loading ...</h1>
  }

  return (
    <div> 
      <h1>Schools</h1>
      <div className="inputBox">
        <h3>Add New</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button onClick={() => addSchool({ title, desc, id: uuidv4() })}>
          Submit
        </button>
      </div>
      
      {schools.map((school) => (
        <div key={uuidv4()}>
          <h2>{school.title}</h2>
          <p>{school.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default App;