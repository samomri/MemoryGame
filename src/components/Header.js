import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode"

const Header = ({ handleNewGame, wins ,counter }) => {
  // Update page title with win count
  useEffect(() => {(document.title = `${wins} wins`)}, [wins]);
  //google Login
  const [user,setUser] = useState({})
  const handleCallbackResponse = (response) => {
    var userObject = jwt_decode(response.credential);
    setUser(userObject)
    document.getElementById("signInDiv").hidden = true;
  }
  const handleSignOut = (e) => {
    setUser({});
    document.getElementById('signInDiv').hidden = false
  }
  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id: "177650736896-4ta957u0igrqrqlo1155hiimlcm4gho5.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    )
  },[])
  return (
    <header className="header">
      <h4>{wins} wins</h4>
      <h4>{counter - 16} clicks</h4>
      <h3>{user.name}</h3>
      <button onClick={handleSignOut} id='signOutButton'>Sign out</button>
      <button onClick={handleNewGame}>New Game</button>
      <div id='signInDiv'></div>
    </header>
  );
};

export default Header;