import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

function Login() {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const navigate = useNavigate()

  const Login = () => {
    if ( Email == "" || Password == ""){
      alert("Please fill all feilds")
    }else{
      axios.post("http://localhost:4000/login" , {
          email:Email,
          password:Password 

      }
      ) 
      .then((res)=>{
          // console.log(res.data.email)
          if(res.data.auth ){
            localStorage.getItem("user",JSON.stringify(res.data.user))
            localStorage.getItem("token",JSON.stringify(res.data.auth))
            navigate('/expense')
          }else{
            alert(" Please Correct Email And Password")
          }

      }).catch((err)=>{
          console.log(err)
      })
     
  }

  }

  return (
    <div>
      <h2>Login  </h2>
            <i>Email  </i>
        <input type="email" value={Email} onChange={(e)=>setEmail(e.target.value)} /><br/><br/>
            < i>Password</i>
        <input type="password" value={Password} onChange={(e)=>setPassword(e.target.value)} /> <br/><br/>

        <button onClick={()=>Login()}>Login</button><br/><br/>
        <i>Create Your Account</i>
        <button onClick={()=>navigate('/signup')}>Sign up</button>
    </div>    
  )
}

export default Login