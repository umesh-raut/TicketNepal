import React from 'react'
import './login.css';
import {useState} from 'react'
import axios from 'axios';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const user = { email, password };
  
    try {
      const response = await axios.post(
        'http://localhost:3000/login',
        user
      );
      
      // alert(response.data);
     localStorage.setItem('currentUser', JSON.stringify(response));
     window.location.href = isAdmin? '/dashboard':'/'; 
    } catch (error) {
      console.error("There was an error!", error);
    }
  }
  return (
    <div className='container'>
  <form className="form"action='POST' onSubmit={handleSubmit}>
  <span className="signup">Log In</span>
  <input type="email" name='email' placeholder="Email address" className="form--input" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
  <input type="password" name='password' placeholder="enter password" className="form--input" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
  <Form.Select aria-label="Default select example" onChange={(e)=>{setIsAdmin(e.target.value === 'yes')}}>
      <option>IS ADMIN</option>
      <option value="yes">YES</option>
      <option value="no">NO</option>
    </Form.Select>
    <br />
  <button type='submit' className="form--submit">
      Log In
  </button>
  <p>Don't have an account <a href='/register'> SIGN UP</a></p>
</form> 
</div>
 )
}

export default Login
