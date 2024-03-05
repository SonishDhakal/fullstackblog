import React, { useEffect, useState } from "react";
import { TextInput, Button,Spinner, Alert } from "flowbite-react";




const ChangePassword = () => {
  const [form, setForm] = useState({});
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null)
  const [success,setSuccess] = useState(false)

  async function updatePassword(){
    setLoading(true)
    setError(null)

    const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if(!PasswordRegex.test(form.newPassword)){
      setLoading(false)
return setError('New Password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special symbol.')

    }

   

    try{

      const res = await fetch('/api/user/updatepassword',{
        method:"POST",
        headers:{
          'Content-type': 'application/json'
        },
        body:JSON.stringify(form)
      })

      const data = await res.json()

      if(!res.ok){
        setLoading(false)
        return setError(data.message)

      }

      setLoading(false)
      setSuccess(true)

      


    }
    catch(e){
      setLoading(false)
      setError(e.message)
    }


  }

  return (
<div className='flex flex-col gap-4'>
  <h2>Change Password</h2>
  <div className='flex flex-col gap-3'>
    <TextInput type="password" onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
           placeholder='Current Password' />
    <TextInput type="password" onChange={(e) => setForm({ ...form, newPassword: e.target.value })} placeholder='New Password' />
  </div>
  <Button disabled={(!form.currentPassword || !form.newPassword || loading)} onClick={updatePassword} gradientDuoTone={'purpleToPink'} className='self-end'>{loading ? <Spinner />: 'Change Password'}</Button>
  {error && <Alert color={'failure'}>{error}</Alert>}
  {success && <Alert color={'success'}>Passoword Changed Successfully</Alert>}
</div>
  )
}

export default ChangePassword