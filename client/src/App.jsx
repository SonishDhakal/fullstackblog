import React from 'react'
import {Button} from 'flowbite-react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/Header'
import Auth from './pages/Auth'
import Home from './pages/Home'
import OnBoarding from './pages/OnBoarding'

const App = () => {
  return (
    <BrowserRouter>
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/onboarding' element={<OnBoarding />} />

      </Routes>

    </div>
    </BrowserRouter>


  )
}

export default App