import React, { useState } from 'react';
import Feed from './components/Feed';
import CreatePost from './components/CreatePost';
import { setUserEmailHeader } from './services/api';

function App() {
  const [email, setEmail] = useState('alice@university.edu');
  
  setUserEmailHeader(email);

  return (
    <div className="container">
      <header>
        <h1>CampusBeacon - Sprint 1 Demo</h1>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <label>Your demo email: </label>
          <input value={email} onChange={e => setEmail(e.target.value)} style={{padding:6}} />
        </div>
      </header>
      <main>
        <CreatePost />
        <Feed />
      </main>
    </div>
  );
}


export default App;
