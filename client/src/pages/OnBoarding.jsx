import React from 'react'
import { Select, TextInput, Textarea } from 'flowbite-react'
const OnBoarding = () => {
  return (
<div className='h-[90vh] w-screen grid place-content-center '>
   
        <form className='bg-white p-5 flex flex-col gap-4 rounded-lg overflow-hidden shadow-xl p-6 border'>
            <div className='flex flex-col md:flex-row md: gap-4 items-center '>
                <img className='w-40' src='/user.png' />
                <p className='text-gray-500'>Upload your image or Use <br /> deafult image</p>
            </div>

            <div className='flex flex-col gap-3'>
                <div className='flex  gap-4'>
                    <TextInput placeholder='first name' name='firstName' />
                    <TextInput placeholder='last name' name='lastName' />
                    
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='font-semibold' htmlFor='gender'>Gender</label>
                    <Select>
                        <option value={'undefined'}>Rather not say</option>
                        <option value={'male'}>Male</option>
                        <option value={'female'}>Female</option>
                    </Select>
                </div>
                <div>
                    <Textarea className='p-3' placeholder='Your Bio' />
                </div>

            </div>


           

        </form>
    </div>


  )
}

export default OnBoarding