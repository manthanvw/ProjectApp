import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';
import Projects from './Projects';
import Navbar from './Navbar';

export default function Bundle() {
 return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
 );
}
