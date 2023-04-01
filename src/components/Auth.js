import React ,{useState} from 'react'
import {auth,googleProvider} from '../config/Firebse'
import { createUserWithEmailAndPassword , signOut, signInWithPopup} from 'firebase/auth'
const Auth = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const SignIn=async ()=>{
        console.log(email,password)
        await createUserWithEmailAndPassword(auth,email,password);
        console.log(auth?.currentUser?.email)
    }
    const SignInWithGoogle=async ()=>{
        await signInWithPopup(auth,googleProvider)
        console.log(auth?.currentUser?.email)
    }
  return (
    <div>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name='email' placeholder='Email.....'  onChange={(e)=>{
            setEmail(e.target.value)
        }}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name='password' placeholder='Password.....' onChange={(e)=>{
            setPassword(e.target.value)
        }}/>

        <button onClick={SignIn}>Sign In</button>
        <button onClick={SignInWithGoogle}>Sign In With Google</button>
        <button onClick={async ()=>{
            await signOut(auth)
            console.log(auth?.currentUser?.email)
        }}>Log Out</button>
    </div>
  )
}

export default Auth