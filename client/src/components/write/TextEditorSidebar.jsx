import React from 'react'
import {Button, Label, Select, TextInput, Textarea} from 'flowbite-react'
const TextEditorSidebar = () => {
  return (
    <div className=' md:w-[300px] flex flex-col gap-12 my-4 '>
      <div className='dark:bg-gray-700 bg-gray-100/[0.8] py-3 px-5 rounded-lg flex flex-col gap-4' >
        <h3 className='text-lg font-semibold'>Publish Article</h3>
        <div className='flex gap-2'>
        <Button outline className='w-15  text-xs'>Save Draft</Button>
        <Button className='w-15  text-xs'>Publish</Button>
        </div>
       <div className='flex flex-col gap-2'>
       <Label htmlFor='slug'>Slug</Label>
        <TextInput id='slug' name='slug' />
       </div>
      </div>
      {/* featured image */}
      <div className='flex flex-col gap-3 dark:bg-gray-700 bg-gray-100/[0.8] py-3 px-5 rounded-lg '>
        <h3 className='text-lg font-semibold'>Featured Image</h3>
        <div className=' border-dotted border-4 border-gray-500 h-[120px] mx-auto w-[250px] grid place-content-center'>
        <div>Upload image</div> 
      
        {/* img */}
        </div>


<Button>Upload</Button>


      </div>
      {/* /OHTER */}
      <div className='flex flex-col gap-4 dark:bg-gray-700 bg-gray-100/[0.8] py-3 px-5 rounded-lg '>
        {/* category */}
        <div>
          <Label htmlFor='category'>Category</Label>
          <Select>
            <option>Next js</option>
          </Select>
        </div>
        <div className='flex flex-col gap-3'>
          <Label htmlFor='tags'>Tags</Label>
          <TextInput />
          <span>Seperate by commas if multiple tags</span>
          <Button>Add</Button>
        </div>
        
      </div>

   
    </div>

  )
}

export default TextEditorSidebar