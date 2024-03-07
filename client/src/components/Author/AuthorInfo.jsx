import moment from 'moment';
import React from 'react'
import { useState } from 'react';
import { RiEdit2Line } from 'react-icons/ri';
import {useSelector} from 'react-redux'
import {Button} from 'flowbite-react'

export const AuthorInfo = ({profile,authorId,posts,changeState,currentState,setCurrentState,settings,setSettings}) => {

  const menu = ["Home", "About", "Bookmarks"];
  const {currentUser} = useSelector(state => state.user)

 
  return (
    <div className="flex flex-col gap-4 ">
    <div className="flex  justify-between sm:flex-row flex-col gap-4">
   <div className='flex gap-4 sm:flex-row flex-col '>
   <div className="flex gap-3 flex-col">
        <img
          className="w-40 h-40 rounded-lg"
          src={profile?.profilePicture}
        />
          <div className="text-gray-500 flex gap-2">

          <span>Joined {moment(profile?.createdAt).format('MMMM YYYY')}</span>

        </div>
      </div>

      <div className="flex flex-col gap-1 ">
        <h2 className="text-2xl md:text-4xl font-semibold">
          {profile?.firstName} {profile?.lastName}
        </h2>
        <p className="text-gray-400 font-semibold">@{authorId}</p>
        <div className="text-gray-500 flex gap-2">
          <span>{profile?.followers?.length} followers</span>
          <span>{profile?.followers?.length} following</span>
        </div>
        <span className='text-gray-500'>{posts?.length} Posts</span>
        <p>{profile?.bio}</p>
      
      </div>
   </div>
   {currentUser?._id ===profile?.userId && 

   <div className='flex sm:self-end'>   <button onClick={() => setSettings(true)} className='border  rounded-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700  transition-all'  ><span className='flex gap-3 items-center'><RiEdit2Line /> Edit Profile</span></button></div>   }
    </div>
    <div>
      <ul className="border-b dark:border-gray-700 pb-[-200px] flex gap-4">
        {menu.map((item,index) => (
          <li
            id={item}
            onClick={changeState}
            key={index}
            className={`${
              currentState === item &&
              "border-b border-gray-500 dark:border-gray-300 pb-3 -mb-[1px]"
            } cursor-pointer`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
  )
}
