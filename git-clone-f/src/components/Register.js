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

  
  function Register() {

    const navigate = useNavigate();

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');


   

    const registerUser = async (e) => {

      e.preventDefault(); 
      if (password !== passwordAgain) {
        alert("Şifreler aynı olmalıdır!");
        return; 
      }

      
    if (!FirstName || !LastName || !email || !password || !passwordAgain) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

      fetch('http://localhost:8080/api/users/register', {
        
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          

            
          body: JSON.stringify({
            firstName: FirstName,  
            lastName: LastName,    
            email: email,           
            password: password 
          })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          console.log('Success:', data);
          navigate('/');
          
      })
      .catch((error) => {
          console.error('Error:', error);
      });
    
  
  
  
    };

    return (
        <>
            <MatrixEffect />
            <div className="login-container">
            <div className="header-options">
        
            </div>
                <div className="login-box">
                    <h1>Welcome To Git-Clone</h1>
                    <input type="firstName" placeholder="First Name" className="input-field" value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="lastName" placeholder="Last Name" className="input-field" value={LastName} onChange={(e) => setLastName(e.target.value)} />
                    <input type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" placeholder="Password Again" className="input-field" value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} />
                    <button className="start-button" onClick={registerUser}>Register</button>
                </div>
            </div>
        </>
    );
}
  
  export default Register;