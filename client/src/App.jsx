import React from 'react'
import {Button} from 'flowbite-react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/Header'
import Auth from './pages/Auth'
import Home from './pages/Home'
import OnBoarding from './pages/OnBoarding'
import Author from './pages/Author'
import Write from './pages/Write'
import PostTemplate from './pages/PostTemplate'

const App = () => {
  return (
    <BrowserRouter>

      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/onboarding' element={<OnBoarding />} />
        <Route path='/author/:authorId' element={<Author />} />
        <Route path='/write' element={<Write />} />
        <Route path='/:username/:slug' element={<PostTemplate />}  />


      </Routes>


    </BrowserRouter>


  )
}

export default App