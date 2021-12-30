import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs
} from "firebase/firestore";

function App() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = collection(db, "schools")
  
  // method 1: real time (web page update automatically when firebase udpates)
  // function getSchools() {
  //   setLoading(true);
  //   onSnapshot(query(ref),(querySnapshot) => {
  //     const items = [];
  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data());
  //     })
  //     setSchools(items);
  //     setLoading(false);
  //   });
  // }

  // method 2: web page won't update automatically, unless you refresh it
  function getSchools2() {
    setLoading(true);
    getDocs(ref).then((item) => { // used .then() instead of async/wait in commit 1
      const items = item.docs.map((doc) => doc.data());
      setSchools(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getSchools2();
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