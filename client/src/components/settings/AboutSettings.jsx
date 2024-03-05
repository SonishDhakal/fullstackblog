import React, { useEffect, useState } from 'react'
import { Textarea,Button, TextInput, Spinner, Alert } from 'flowbite-react'
import { RiInstagramLine, RiLinkedinLine, RiTwitterXLine } from 'react-icons/ri'
import {TbWorldWww} from 'react-icons/tb'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
const AboutSettings = () => {
  const [form,setForm] =useState(null);
  const {currentUser} = useSelector(state => state.user)
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const [success,setSuccess] = useState(null)
  const [compare,setCompare] = useState(null)



async function fetchAbout(){

  setLoading(true)
  try{

    const res = await fetch(`/api/profile/about/${currentUser._id}`);

    const data = await res.json()

    if(!res.ok){
      setError(data.message)
      return setLoading(false)

    }
    setForm(data)
    setCompare(data)
    setLoading(false)

  }
  catch(e){
    setError(e.message)
    setLoading(false)
  }

}

  useEffect(() =>{

if(currentUser){

  fetchAbout()
}









  },[currentUser])


  function handleChange(e){
    setForm({...form,socials:{...form.socials, [e.target.id]:e.target.value}})
  }


  async function handleSave(){
    setError(null)
    setSuccess(null)
    setLoading(true)
    try{
      const res = await fetch('/api/profile/updateabout',{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body: JSON.stringify(form)
      })

      const data = await res.json();

      if(!res.ok){
        setLoading(false)
        return setError(data.message)

      }
setLoading(false)
      setSuccess('Profile Update Successfully')






    }
    catch(e){
      setLoading(false)
      setError(e)
    }
  }
  return loading ? <div className='flex w-full h-full items-center justify-center'><Spinner /></div> :
<div className='flex flex-col gap-4'>
  <div className='flex flex-col gap-2'>
    <label htmlFor="about">What are your blogs related to?</label>
    <Textarea onChange={(e) => setForm({...form, about:e.target.value})} value={form?.about} className='resize-none h-52'/>
  </div>
  <div className='flex flex-col gap-3'>
    <h3>Add your socials</h3>
    <div className='flex flex-col gap-4'>
      <div className='flex gap-3 item-center'>
        <Button color='gray' className='w-10 h-10'><RiInstagramLine /></Button>
        <TextInput onChange={handleChange}  id='instagram' value={form?.socials && form?.socials?.instagram} className='w-full' />
      </div>
      <div className='flex gap-3 item-center'>
        <Button color='gray' className='w-10 h-10'><RiTwitterXLine /></Button>
        <TextInput onChange={handleChange}  id='x' value={form?.socials && form?.socials?.x} className='w-full' />
      </div>
      <div className='flex gap-3 item-center'>
        <Button color='gray' className='w-10 h-10'><RiLinkedinLine /></Button>
        <TextInput onChange={handleChange}  id='linkdin' value={form?.socials && form?.socials?.linkdin} className='w-full' />
      </div>
      <div className='flex gap-3 item-center'>
        <Button color='gray' className='w-10 h-10'><TbWorldWww/></Button>
        <TextInput onChange={handleChange} id='website' value={form?.socials && form?.socials?.website} className='w-full' />
      </div>
    </div>

  </div>
  <div className='flex justify-end'>
    <Button disabled={(form===compare || loading)} onClick={handleSave} pill gradientDuoTone={'purpleToBlue'}>{loading ? <Spinner />  :'Save'}</Button>
    
  </div>
  {error && <Alert color={'failure'}>{error}</Alert>}
  {success && <Alert color={'success'}>{success}</Alert>}
</div>
  
}

export default AboutSettings