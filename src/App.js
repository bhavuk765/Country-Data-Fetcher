import React from 'react';
import './App.css';
import SearchForm from "./SearchForm"
function App() {
  return (
    <div className="App">
      <h1 style={{textDecoration:"underline",justifyContent:"center", display:"flex"}}>Country Data Application</h1>
      <SearchForm/>
    </div>
  );
}

export default App;
