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
import Dashboard from './pages/Dashboard'
import AuthenticatedProvider from './components/provider/AuthenticatedProvider'
import UnAuthenticatedProvider from './components/provider/UnAuthenticatedProvider'
import Search from './pages/Search'

const App = () => {
  return (
    <BrowserRouter>

      <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route element={<UnAuthenticatedProvider />}>
        <Route path='/auth' element={<Auth />} />
        </Route>
       
        <Route path='/:authorId' element={<Author />} />
        <Route path='/:username/:slug' element={<PostTemplate />}  />
       <Route element={<AuthenticatedProvider />}>
       <Route path='/onboarding' element={<OnBoarding />} />
        <Route path='/write' element={<Write />} />
        <Route path='/dashboard' element={<Dashboard />}  />
       </Route>


      </Routes>
      </div>


    </BrowserRouter>


  )
}

export default App