import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

//firestore
import { initializeApp } from "firebase/app";
import { getDoc, getFirestore } from "firebase/firestore";
import { doc,setDoc, collection, updateDoc,arrayUnion } from "firebase/firestore"; 

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCBfWQ7U_mmvKMzwGcQgpH1C_dNnlzZajU',
  authDomain: 'memorygame-cec19.firebaseapp.com',
  projectId: 'memorygame-cec19',
  storageBucket: 'memorygame-cec19.appspot.com',
  messagingSenderId: '255426498689',
  appId: '1:255426498689:web:7466b4f7847601de9e3d80'
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Component
const Header = ({ handleNewGame, wins ,setWins,counter, scoreArray }) => {
  // Update page title with win count
  useEffect(() => {(document.title = `${wins} wins`)}, [wins]);

  // handle google Login
  const [user,setUser] = useState({})

  const handleCallbackResponse = (response) => {
  var userObject = jwt_decode(response.credential);
  setUser(userObject)
  document.getElementById("signInDiv").hidden = true;
  }

  const handleSignOut = (e) => {
  setUser({});
  setWins(0);
  document.getElementById('signInDiv').hidden = false
  }
  
  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id: '177650736896-4ta957u0igrqrqlo1155hiimlcm4gho5.apps.googleusercontent.com',
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "medium"}
    )
  },[])


  //Saving The player's run to the database
  const saveRun = async () => {
    const playerDocRef = doc(db, "players", user.name)
    const docSnap = await getDoc(playerDocRef)

    if (docSnap.exists()){
      try{
        await updateDoc(playerDocRef, {
          scoreArray: arrayUnion(...scoreArray),
          wins:docSnap.data().scoreArray.length+1
        })
      } catch (e){
        console.log("Error updating document: ", e)
      }
    }else {
        try {
          const docData = {
            name: user.name, 
            scoreArray: scoreArray,
            wins: wins, 
          }
          const playerRef = collection(db, "players")
          const docRef = await setDoc(doc(playerRef, user.name), docData);
          handleNewGame();
          console.log("Document written with ID: ", docRef);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    }
  }


  //rendring Header component
  return (
    <header className="header">
      <div id='signInDiv'></div>
      { Object.keys(user).length !== 0 && 
          <>
            <h4>{wins} wins</h4>
            <h4>{counter} clicks</h4>
            <h3>{user.name}</h3>
            <button onClick={ (e) => handleSignOut(e)}> Sign Out</button>
            <button onClick={handleNewGame}>New Game</button>
            <button onClick={saveRun}>Save Run</button>
          </>
      }
    </header>
  );
};

export default Header;