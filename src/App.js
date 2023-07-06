import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home"
import UserRegistrationForm from "./Components/UserRegistrationForm"
import View from './Components/View';
import Edit from './Components/Edit';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/view/:id' element={<View />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/registration' element={<UserRegistrationForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
