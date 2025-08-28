import React from 'react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import {auth} from '../firebase'
import {useNavigate } from 'react-router-dom';

const provider = new GoogleAuthProvider();
const Login = () => {
    const navigate = useNavigate();
    const handleLogin = ()=>{
        signInWithPopup(auth, provider)
        .then(()=>{
            navigate('/crud')
        })
        .catch(console.error);
    }
  return (
    <div>
        <h1>Login</h1>
        <button onClick={handleLogin}>Sign in with google</button>
    </div>
  )
}

export default Login