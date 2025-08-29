import React, { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const provider = new GoogleAuthProvider();
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        navigate('/crud')
      })
      .catch(console.error);
  }
  const handleSignIn = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    navigate("/crud");
  } catch (error) {
    console.error("Error signing in:", error.message);
  }
};

  return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)} />
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleLogin}>Sign in with google</button>
    </div>
  )
}

export default Login