import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import dockerLogo from './assets/docker-transformed.png';
import kubLogo from './assets/kub.png';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Weather from './components/weather';

function App() {
  const [users, setUsers] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log("API URL:", apiUrl);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get(`${apiUrl}/api/users/`);
    setUsers(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${apiUrl}/api/users/${id}/`);
    fetchUsers();
  };

  return (
    <Router>
      <div className="app-container">
        {/* Sidebar Navigation */}
        <nav className="sidebar">
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/users">View User Data from Microservice1</Link></li>
            <li><Link to="/weather">Weather Microservice2</Link></li>
            <li><Link to="#">M3</Link></li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="main-content">
          <header>
            <h1>Docker & Kubernetes Learning</h1>
          </header>

          <Routes>
            <Route path="/" element={
              <div className="dashboard">
                <h2>Test your microservice with Container</h2>
                <div className="logo-container">
                  <img src={dockerLogo} alt="Docker Logo" className="logo" />
                  <img src={kubLogo} alt="Kubernetes Logo" className="logo" />
                </div>
              </div>
            } />

            <Route path="/users" element={
              <div className="user-management">
                <h2>User Management</h2>
                <UserForm fetchUsers={fetchUsers} />
                <UserList users={users} onDelete={handleDelete} />
              </div>
            } />
            
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
