import React, {useState} from 'react';
import { useNavigate} from 'react-router-dom';

import './Login.css';

function MatrixEffect() {
    const matrixRows = Array.from({ length: 100 }).map((_, index) => (
      <div
        key={index}
        className="matrix-text"
        style={{ left: `${Math.random() * 100}vw`, animationDuration: `${Math.random() * 10 + 5}s` }}
      >
        {Array.from({ length: 10 }).map(() => String.fromCharCode(0x30A0 + Math.random() * 96))}
      </div>
    ));
  
    return <div className="matrix-effect">{matrixRows}</div>;
  }
  
  function Login() {

    const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const openRegister = async (e) =>{

    navigate('/register');

  };

  const openAdmin = async (e) =>{

    navigate('/admin');

  };


 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => {
        if (response.status === 401) {
            throw new Error('Unauthorized');
        }
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        navigate('/main', { state: { name: data.firstName , lastname: data.lastName , id: data.id } }); 
         
         
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("E-posta veya şifre hatalı!!");
    });
};

    return (
        <>
            <MatrixEffect />
            <div className="login-container">
            <div className="header-options">
        <button className='register-button' onClick={openRegister}>GET START!</button>
        <button className='register-button-2' onClick={openAdmin}>ADMIN</button>
            </div>
                <div className="login-box">
                    <h1>Welcome To Git-Clone</h1>
                    <input type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="start-button" onClick={handleSubmit}>Start</button>
                </div>
            </div>
        </>
    );
}
  
  export default Login;