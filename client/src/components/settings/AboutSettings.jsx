import React from 'react'
import { Textarea,Button, TextInput } from 'flowbite-react'
import { RiInstagramLine, RiLinkedinLine, RiTwitterXLine } from 'react-icons/ri'
const AboutSettings = () => {
  return (
<div className='flex flex-col gap-4'>
  <div className='flex flex-col gap-2'>
    <label htmlFor="about">What are your blogs related to?</label>
    <Textarea className='resize-none h-52'/>
  </div>
  <div className='flex flex-col gap-3'>
    <h3>Add your socials</h3>
    <div className='flex flex-col gap-4'>
      <div className='flex gap-3 item-center'>
        <Button color='gray' className='w-10 h-10'><RiInstagramLine /></Button>
        <TextInput className='w-full' />
      </div>
      <div className='flex gap-3 item-center'>
        <Button color='gray' className='w-10 h-10'><RiTwitterXLine /></Button>
        <TextInput className='w-full' />
      </div>
      <div className='flex gap-3 item-center'>
        <Button color='gray' className='w-10 h-10'><RiLinkedinLine /></Button>
        <TextInput className='w-full' />
      </div>
    </div>

  </div>
  <div className='flex justify-end'>
    <Button pill gradientDuoTone={'purpleToBlue'}>Save</Button>
  </div>
</div>
  )
}

export default AboutSettings