import React, { useEffect, useState } from 'react'
import {} from 'react'
import Post from './Post'
const TopPosts = () => {
  const [posts,setPosts] = useState([])
  const [error,setError] = useState(null)

  async function fetchPosts(){
    try{
      const res = await fetch('/api/post/popularposts');
      const data = await res.json()
      if(!res.ok){
       return setError(data.message)
      }

      setPosts(data.randomPosts)
      


    }
    catch(e){
      setError(e)
    }
  }
  useEffect(() =>{
    fetchPosts()

  },[])
  return posts &&
<div>
  <h2 className='mx-auto text-lg font-semibold text-center mb-4'>Top Rated Posts </h2>
  <div className='flex flex-col gap-3'>
    {posts.map(post =>
      <Post  post={post} key={post._id} />
    )}
  </div>
</div>
  
}

export default TopPosts