import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Main.css'; 

function Main() {
    const navigate = useNavigate();
    const location = useLocation();

    
    const { name, lastname, id } = location.state || {}; 

    const [projects, setProjects] = useState([]); 

    function addProject() {
        console.log("Projenin sahibi : " + id);
        navigate('/project', { state: { id, name, lastname } }); 
    }

    function home(){
        navigate('/');
    }

  
    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/api/projects/getAllProjectsByProjectOwnerId/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Proje bulunamadı');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Veri alındı:', data);
                    setProjects(data); 
                })
                .catch(error => console.error('Veri çekme hatası:', error));
        }
    }, [id]);

    return (
        <>
            <div style={{ backgroundColor: 'grey', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                <h1>{name ? `Welcome, ${name} ${lastname}` : 'Hoş geldiniz!'}</h1>
                <button className="glow-on-hover" type="button" onClick={addProject}>CLICK ME, FOR ADD PROJECT</button>
                <button className="glow-on-hover" type="button" onClick={home}>CLICK ME, FOR HOME</button>
            </div>

            <br />
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1>Your Projects</h1>
            </div>

            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                    <h3>Project Title</h3>
                    {projects.length > 0 ? (
                        projects.map((project, index) => (
                            <p key={index}>{project.title}</p>  
                        ))
                    ) : (
                        <p>No projects found</p>
                    )}
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h3>Project Language</h3>
                    {projects.length > 0 ? (
                        projects.map((project, index) => (
                            <p key={index}>{project.language}</p>  
                        ))
                    ) : (
                        <p>No projects found</p>
                    )}
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h3>Project Explanation</h3>
                    {projects.length > 0 ? (
                        projects.map((project, index) => (
                            <p key={index}>{project.explanation}</p>  
                        ))
                    ) : (
                        <p>No projects found</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Main;
