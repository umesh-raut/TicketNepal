import React from 'react'
import './login.css'
import {useState} from 'react'
import axios from 'axios';



const Register = () => {
    const [email, setemail] = useState('');
    const [number, setnumber] = useState('');
    const [fullName, setfullName] = useState('');
    const [password, setpassword] = useState('');
    const [cPassword, setcPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (password !== cPassword) {
          alert("Passwords do not match");
          return;
        }
        
        const user = { email, number, password, fullName};
      
        try {
          const response = await axios.post(
            'http://localhost:3000/register',
            user
          );
          alert(response.data);
          // setemail('');
          // setnumber('');
          // setpassword('');
          // setcPassword('')
          window.location.href='/login'
        } catch (error) {
          console.error("There was an error!", error);
        }
      }
      
  return (
    <div className='container'>
<form className="form" action='POST' onSubmit={handleSubmit}>
    <span className="signup">Sign Up</span>
    <input type="email" name='email' placeholder="Email address" className="form--input" value={email} onChange={(e)=>{setemail(e.target.value)}} required/>
    <input type='number'name='number' placeholder='phone number' className='form--input' value={number} onChange={(e)=>{setnumber(e.target.value)}} required/>
    <input type='text'name='fullName' placeholder='full Name' className='form--input' value={fullName} onChange={(e)=>{setfullName(e.target.value)}} required/>
    <input type="password" name='password' placeholder="Password" className="form--input" value={password} onChange={(e)=>{setpassword(e.target.value)}} required/>
    <input type="password"  name='cPassword' placeholder="Confirm password" className="form--input" value={cPassword} onChange={(e)=>{setcPassword(e.target.value)}} required/>
    <button type='submit' className="form--submit" >
        Sign up
    </button>
</form>
</div>
  )
}

export default Register
