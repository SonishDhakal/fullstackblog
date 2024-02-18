import React, { useState } from 'react'
import { TextInput, Textarea, Button, Modal } from 'flowbite-react'
import {RiLockPasswordLine, RiMailLine, RiUser2Line} from 'react-icons/ri'
const Signup = ({setCurrentState}) => {
  const [modal,setModal] = useState(false)
  const [vcode,setVcode] = useState([])


  function handelCode(e){
    const copyCode = [...vcode];

    copyCode[e.target.name] =e.target.value
    setVcode(copyCode)


  }
  return (
<div className='shadow-xl  px-8 py-12 flex flex-col gap-12'>
  <div>
  <h2 className='text-lf lg:text-2xl text-center'>Signup from your account to use all<br /> the features!</h2>


  </div>
  <form className='flex flex-col gap-4'>
  <TextInput placeholder='Username' icon={RiUser2Line} type='text' id='username' />
    <TextInput placeholder='Email' icon={RiMailLine} type='email' id='email' />
    <TextInput icon={RiLockPasswordLine} placeholder='password' id='passowrd' type='password' />
    <Button onClick={() => setModal(true)}  gradientDuoTone={'redToYellow'} className='w-full' pill>Sign In</Button>

    <span>Don't have an account? <span className='text-red-400 cursor-pointer' onClick={() => setCurrentState('signin')}>Signup</span></span>
  
  <Modal className='' size={'sm'} show={modal} onClose={() => setModal(false)}>
<div className='p-4'>
<h3 className='text-xl font-bold text-gray-700 text-center'>Email Verification</h3>
    <Modal.Body >
   <div className='flex gap-4'>
   <TextInput maxLength={1} name='0' onChange={(e) => handelCode(e)}/>
      <TextInput maxLength={1} name='1'  onChange={(e) => handelCode(e)} />
      <TextInput maxLength={1} name='2' onChange={(e) => handelCode(e)} />
      <TextInput maxLength={1} name='3' onChange={(e) => handelCode(e)} />
   </div>
   <p className='text-center text-gray-500 mt-2'>Resend Again</p>
    </Modal.Body>

  <div className='flex justify-between'>
  <Button outline onClick={() => setModal(false)}>Change Email</Button>
      <Button gradientDuoTone={'purpleToBlue'}>Next</Button>
  </div>

</div>

  </Modal>
  </form>

</div>
  )
}

export default Signup