import React from 'react';
import { useEffect, useState } from 'react';
import Input from './components/input'
import './App.css';

function App() {
  


  return (
    <main>
      <h1 style={{fontStyle:'oblique'}}>The Orbacle</h1>
      <img style={{height:'200px', width:"200px", marginTop:"0px"}} src={"Orbacle.png"}/>

      <Input />

     
    </main>
  );
}

export default App;
