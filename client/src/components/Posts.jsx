import React, { useEffect, useState } from 'react'
import { Spinner } from 'flowbite-react'
import Postcard from './Postcard';
const Posts = ({search}) => {
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null)

  async function fetchPosts(){
   

    try{
      
      const res = await fetch(`/api/post/getposts${search}`)
      if(!res.ok){
        setLoading(false)
      return  setError(data.message)
      }
      const data = await res.json();
      setLoading(false)
      setPosts(data)





   






    }
    catch(e){
      setError(e.message)
      setLoading(false)

    }
  }
  useEffect(() =>{
    fetchPosts();

  },[search])
  return loading ? <div className='w-full h-[40vh] grid place-content-center'><Spinner /></div> : <div>
    <div className="flex flex-col gap-4 my-4 mx-4">
      {posts.length ===0 && <p>No posts found</p>}
    {posts?.map(card => 

     <Postcard key={card?._id} post={card} />
    )}
      </div>

  </div>

  
}

export default Posts