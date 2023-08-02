import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import {collection, orderBy, limit, query, addDoc, serverTimestamp} from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {db,auth} from './firebase';
import {useEffect, useRef, useState} from 'react';
import './App.css';

function App() {
 
  
  return (
    <div className="App">
 
    </div>
  );

}

export default App;
