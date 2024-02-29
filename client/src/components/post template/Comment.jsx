import React, { useState } from 'react'
import {RiHeart2Line} from 'react-icons/ri'
const Comment = ({currentUser}) => {
  return (
    <div className="flex flex-col gap-2 border-b pb-3">
    <div className="flex items-center gap-3">
      <img
        className="w-10 h-10 rounded-full"
        src={currentUser?.profilePicture}
        alt="user"
      />
      <div className="flex flex-col ">
        <span className="font-semibold">Sonish Dhakal</span>
        <span className="text-gray-500">3 months ago</span>
      </div>
    </div>
    <div>
        <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, tempore. Culpa recusandae quibusdam harum hic! Eos tempora impedit nihil omnis?</p>
    </div>
    <span className='flex items-center gap-1'><RiHeart2Line   className={`cursor-pointer text-lg }`}/> {200}</span>

  </div> 
  )
}

export default Comment