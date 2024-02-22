import React, { useState } from 'react'
import Signup from '../components/Auth/Signup'
import Signin from '../components/Auth/Signin'


const Auth = () => {
    const [currentState, setCurrentState] = useState('signin')
  return (
    <div className='max-w-screen min-h-[80vh] grid place-content-center my-4'>
        {currentState==='signin' ? <Signin setCurrentState={setCurrentState} /> : <Signup setCurrentState={setCurrentState}  /> }
    </div>

  )
}

export default Auth