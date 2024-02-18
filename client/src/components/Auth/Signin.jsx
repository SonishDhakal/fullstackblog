import React from 'react'
import { TextInput, Textarea, Button } from 'flowbite-react'
import {RiLockPasswordLine, RiMailLine} from 'react-icons/ri'
const Signin = ({setCurrentState}) => {
  return (
<div className='shadow-xl  px-8 py-12 flex flex-col gap-12'>
  <div>
  <h2 className='text-lf lg:text-2xl text-center'>Signin from your account to use all<br /> the features!</h2>


  </div>
  <form className='flex flex-col gap-4'>
    <TextInput placeholder='Email' icon={RiMailLine} type='email' id='email' />
    <TextInput icon={RiLockPasswordLine} placeholder='password' id='passowrd' type='password' />
    <Button  type='submit' gradientDuoTone={'redToYellow'} className='w-full' pill>Sign In</Button>

    <span>Don't have an account? <span className='text-red-400 cursor-pointer' onClick={() => setCurrentState('signup')}>Signup</span></span>
  </form>

</div>
  )
}

export default Signin