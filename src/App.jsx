import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice' 
import Header from './componenets/Header/Header'
import Footer from './componenets/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() { 

  //when user load app
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()

  //useeffect to check user login or not
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    //to tell loading work has done
    .finally(() => setloading(false))
  }, [])

  //conditional rendering
  return !loading ? (
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
  
}

export default App
