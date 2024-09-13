import React, {useState} from 'react';
import { useNavigate ,useLocation } from 'react-router-dom';
import './Project.css'; 

function Project(){

    const [title, setTitle] = useState('');
    const [language, setLanguage] = useState('');
    const [explanation, setExplanation] = useState('');
    const location = useLocation();
    const { id } = location.state || {};
    const { name } = location.state || {}; 
    const { lastname } = location.state || {};


    

    const navigate = useNavigate();

    const registerProject = async (e) => {

        e.preventDefault(); 
 
        fetch('http://localhost:8080/api/projects/register', {
          
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            
  
              
            body: JSON.stringify({
              title: title,  
              language: language,    
              explanation: explanation,           
              projectOwnerId: id
            })
        })
        .then(response => {
            console.log(id);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            navigate('/main', { state: { id , name , lastname } });
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
      
    
    
    
      };


return(

    <>

        <div className='login-container'>
                <div className="login-box">
                    <h1>ADD YOUR PROJECT</h1>
                    <input type="title" placeholder="Project Title" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="language" placeholder="Project Language" className="input-field" value={language} onChange={(e) => setLanguage(e.target.value)} />
                    <input type="explanation" placeholder="Project Expllanation" className="input-field" value={explanation} onChange={(e) => setExplanation(e.target.value)}/> 
                   <button className="start-button" onClick={registerProject}>Add Project</button>
                </div>
        </div>





    </>    
    );

}

export default Project;