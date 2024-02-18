import React, { useState } from 'react'
import { TextInput, Button, Modal } from 'flowbite-react'
import {RiLockPasswordLine, RiMailLine, RiUser2Line} from 'react-icons/ri'

const Signup = ({setCurrentState}) => {
  const [modal,setModal] = useState(false)
  const [vcode,setVcode] = useState([])

  const [form,setFrom] = useState({})

  async function handelSubmit(e){
    e.preventDefault();

    try{
      const newUserId = await fetch('/api/auth/sign-up' ,{
        method:'POST',
        headers:{
          "Content-type": "application/json"
        },
        body: JSON.stringify(form)
      })

      const data = await newUserId.json()

      if(!newUserId.ok){
       return console.log(data.message)
      }
      setModal(true)

      console.log(data)

    }
    catch(e){
      console.log(e)
    }

  }


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
  <form onSubmit={handelSubmit} className='flex flex-col gap-4'>
  <TextInput required minLength={4} maxLength={16} onChange={(e) => setFrom({...form, username:e.target.value})} placeholder='Username' icon={RiUser2Line} type='text' id='username' />
    <TextInput required onChange={(e) => setFrom({...form, email:e.target.value})} placeholder='Email' icon={RiMailLine} type='email' id='email' />
    <TextInput required minLength={8} maxLength={16} onChange={(e) => setFrom({...form, password:e.target.value})} icon={RiLockPasswordLine} placeholder='password' id='passowrd' type='password' />
    <Button type='submit'  gradientDuoTone={'redToYellow'} className='w-full' pill>Sign up</Button>

    <span>Don't have an account? <span className='text-red-400 cursor-pointer' onClick={() => setCurrentState('signin')}>Signin</span></span>
  
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