import React, { useState } from 'react'
import Signup from '../components/Auth/Signup'
import Signin from '../components/Auth/Signin'
import EmailVerification from '../components/Auth/EmailVerification'

const Auth = () => {
    const [currentState, setCurrentState] = useState('verify')
  return (
    <div className='w-screen h-[90vh] grid place-content-center'>
        {currentState==='signin' ? <Signin setCurrentState={setCurrentState} /> : <Signup setCurrentState={setCurrentState}  /> }
    </div>

  )
}

export default Auth