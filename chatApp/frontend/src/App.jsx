import React from 'react'
import Login from '../components/login'
import Chat from '../components/Chat'
// import Home from '../components/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}>
          </Route>
          <Route path='/chat' element={<Chat />}> </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
