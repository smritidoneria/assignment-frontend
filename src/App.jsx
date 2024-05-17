import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserRegistration from './UserRegistration'
import RecommendationsI from './RecommendationsI'
import RecommendationsII from './RecommendationsII'
import RecommendationsIII from './RecommendationsIII'
import Movies from './Movies'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
   <Router>
    <Routes>
    <Route path="/" element={<UserRegistration/>} />
    <Route path="/movies" element={<Movies/>} />
    <Route path="/recommend1/:userId" element={<RecommendationsI />} />
    <Route path="/recommend2/:userId" element={<RecommendationsII />} />
    <Route path="/recommend3/:userId" element={<RecommendationsIII />} />
    </Routes>
   </Router>
  )
}