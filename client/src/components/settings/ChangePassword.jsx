import React from 'react'
import { TextInput,Button } from 'flowbite-react'
const ChangePassword = () => {
  return (
<div className='flex flex-col gap-4'>
  <h2>Change Password</h2>
  <div className='flex flex-col gap-3'>
    <TextInput placeholder='Current Password' />
    <TextInput placeholder='New Password' />
  </div>
  <Button gradientDuoTone={'purpleToPink'} className='self-end'>Update Password</Button>
</div>
  )
}

export default ChangePassword