import React, { useEffect, useState } from "react";



function Admin() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/users/allUsers'); 
                if (!response.ok) {
                    throw new Error('Kullanıcı bilgileri alınamadı');
                }
                const data = await response.json(); 
                console.log('Kullanıcı verileri alındı:', data);
                setUsers(data); 
            } catch (error) {
                console.error("Veri çekme hatası:", error);
            }
        };

        fetchUsers();
    }, []); 

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/delete/${userId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Kullanıcı silinemedi');
            }
            const data = await response.text(); 
            console.log('Kullanıcı silindi:', data);

            
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Kullanıcı silme hatası:", error);
        }
    };


    return (
        <>
            <div className="admin-container">
                <h1>Kullanıcı Bilgileri</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Password</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.password}</td>
                                <td>
                                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Admin;
