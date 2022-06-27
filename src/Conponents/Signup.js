import axios from 'axios'
import React,{useState} from 'react'
import"../App.css"
import {useNavigate} from 'react-router-dom';

function Signup() {

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const navigate = useNavigate()

    // console.log(Name)

const Signin = () => {
    if ( Name == "" || Email == "" || Password == ""){
        alert("Please fill all feilds")
      }else{
        axios.post("http://localhost:4000/Signup" , {
            name:Name,
            email:Email,
            password:Password 

        }) 
        .then((res)=>{
            console.log(res)
            setName('')
            setEmail('')
            setPassword('')

            if(res){
                navigate('/')
                localStorage.setItem('user',JSON.stringify(res.data.useCreate))
                localStorage.setItem('token',JSON.stringify(res.data.auth))
            }
        }).catch((err)=>{
            console.log(err)
        })
       
    }
}

  return (
    <div className='App'>
        <label>Name</label>   
         <input type="text" value={Name} onChange={(e)=>setName(e.target.value)} /><br/>
        <label>Email</label>
         <input type="email" value={Email} onChange={(e)=>setEmail(e.target.value)}/><br/>
        <label>Password</label>
        <input type="password" value={Password} onChange={(e)=>setPassword(e.target.value)}/><br/>   
        <button onClick={()=>Signin()}>Signup</button>
        <button onClick={()=>navigate('/')}>Login</button>
    </div>
  )
}

export default Signup