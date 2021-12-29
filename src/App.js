import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";
import {
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";

function App() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = collection(db, "schools")
  
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

  useEffect(() => {
    getSchools();
  }, []);

  if (loading) {
    return <h1>Loading ...</h1>
  }

  return (
    <div> 
      <h1>Schools</h1>
      {schools.map((school) => (
        <div key={school.id}>
          <h2>{school.title}</h2>
          <p>{school.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
