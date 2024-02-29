import React, { useEffect, useState } from 'react'
import moment from 'moment';
const AuthorHome = ({userId,username,posts}) => {
  const [loading,setLoading] = useState();
  const [error,setError] = useState()

 
  return (
<div className='flex flex-col gap-4'>
  {posts?.map((post) =>
  <div key={post.id} className='shadow-[0_3px_10px_rgb(0,0,0,0.2)]  flex md:flex-row  flex-col gap-4 rounded-md px-3 py-4 overflow-hidden cursor-pointer'>
    <div className='md:w-[400px] w-[250px] mx-auto h-[140px]'>
      <img src={post.featuredImage} className='w-full h-full rounded-lg' />
    </div>
    <div className='flex flex-col gap-1'>
      <h1 className='fobt-bold text-xl'>{post?.title}</h1>
      <p className='text-gray-500'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed non nulla vero rem tempora dicta veniam corporis aliquam dignissimos exercitationem inventore, facilis quod! Iusto enim expedita provident. Cum, earum sunt.</p>
   <div className='flex justify-between'>
    <span className='text-sm text-gray-500'>by <span className=' cursor-pointer text-md text-gray-800 dark:text-gray-300'>@{username}</span></span>
    <span className='text-sm text-gray-500'>{moment(post.createdAt).fromNow()}</span>
   </div>
    </div>
  </div>
  )}


</div>
  )
}

export default AuthorHome