import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import {collection, orderBy, limit, query, addDoc, serverTimestamp} from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {ref, getDownloadURL } from "firebase/storage";
import { useUploadFile } from 'react-firebase-hooks/storage';
import {db,auth,storage} from './firebase';
import {useEffect, useRef, useState} from 'react';
import FileRenderer, {getFileType} from './Components/FileRenderer';
import Form from './Components/Form';
import Chat from './Components/Chat';
import Login from './Components/Login';
import Logout from './Components/NavBar';
import './App.css';
import './Login.css';
import './NavBar.css';
function App() {
	const [user] = useAuthState(auth);
  const messageRef = collection(db, 'messages')
  const queryRef = query(messageRef, orderBy('createdAt','asc'))
  const [messages] = useCollection(queryRef,{idField:'messageId'})
  const [uploadFile, uploading] = useUploadFile();
  const [formValue, setFormValue] = useState('')
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)
  const textAreaRef = useRef(null)
	const scrollTo = useRef(null)

  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  const logout = () => {
    signOut(auth);
  };
  const handleChange = (e) => {
    setFormValue(e.target.value);
  }
  const handleFileChange = (e) =>{
     setFile(e.target.files[0])
  }
  const handleDelete = () =>{
    setFile(null)
    fileInputRef.current.value = null;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTo.current) {
        scrollTo.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    const mediaElements = document.querySelectorAll('img','video','audio');
    const mediaLoadPromises = Array.from(mediaElements).map((media) => {
      return new Promise((resolve) => {
        if (media.complete) {
          resolve();
        } else {
          media.addEventListener('load', resolve);
        }
      });
    });
  
    Promise.all(mediaLoadPromises).then(() => {
      handleScroll();
    });
  
    return () => {
      mediaElements.forEach((media) => {
        media.removeEventListener('load', handleScroll);
      });
    };
  });
  
  
  
 
  const sendMessage = async(e) =>{
    e.preventDefault()
    if (!user || (!formValue && !file)) return
		const payload = {
    text: formValue || "", 
    createdAt: serverTimestamp(), 
    uid:user.uid,
    photoURL:user.photoURL, 
    userName: user.displayName,
    fileName: file ? file.name : null }
    if (file){
    
      const storageRef = ref(storage, `images/${file.name}`)
      const uploadRef = await uploadFile(storageRef, file)
      const downloadURL = await getDownloadURL(uploadRef.ref)
      const fileType = getFileType(file)
      if (fileType === 'image'){
        payload.image = downloadURL
      } 
      else if (fileType === 'video'){
        payload.video = downloadURL
      } 
      else if (fileType === 'audio'){
        payload.audio = downloadURL
      } 
      else {
        payload.other = downloadURL
      }
    }
    fileInputRef.current.value = null;
    setFile(null)
    await addDoc(messageRef,payload)
    
    setFormValue('')
 
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      sendMessage(e);
    }
  }
	
  return (
    <>
        {!user ? <Login login={login}/> :
          <div>
						<Logout logout={logout}/> 
            <div className="container">
              {messages && messages.docs.map(msg => <Chat key={msg.id} message={msg.data()} />)}
  
              {uploading && <span>Uploading file...</span>}
              {!uploading && file && 
              <div className='sent relative reverse'>
                  <FileRenderer file={file}/>
                  <button onClick={handleDelete} className='clear-button'><span className='clear-icon'></span> </button>
                  
              </div>
							}
					<div ref={scrollTo}></div>
            </div>
          </div>
        }
      
      <div className='form-container'>
        <Form
        sendMessage={sendMessage}
        handleFileChange={handleFileChange}
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
        formValue={formValue}
        file={file}
        textAreaRef={textAreaRef}
        fileInputRef={fileInputRef}
        />
      </div> 
		</>
       
    
  );

}

export default App;