import React, { useEffect, useState } from 'react'
import { Spinner } from 'flowbite-react'
import Postcard from './Postcard';
import {Button} from 'flowbite-react'

const Posts = ({search}) => {
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null)
  const [showMore,setShowMore] = useState(false)


  async function handelShoreMore(){

    const startIndex = posts.length;
    try{
      const res = await fetch(`/api/post/getposts${search}&startIndex=${startIndex}`)
      if(!res.ok){

      return  setError(data.message)
      }
      const data = await res.json();
      setPosts([...posts, ...data])
      if(data.length ===10){
        setShowMore(true)
  
      }
      else{
        setShowMore(false)
      }
      

    }
    catch(e){
      setError(e.message)
    }
  }

  async function fetchPosts(){
   

    try{

      
      const res = await fetch(`/api/post/getposts${search}`)
      if(!res.ok){
        setLoading(false)
      return  setError(data.message)
      }
      const data = await res.json();
      if(data.length>=10){
        setShowMore(true)

      }
      setLoading(false)
      setPosts(data)





   






    }
    catch(e){
      setError(e.message)
      setLoading(false)

    }
  }
  useEffect(() =>{
if(search){
  fetchPosts();

}

setShowMore(false)
  },[search])
  return loading ? <div className='w-full h-[40vh] grid place-content-center'><Spinner /></div> : <div>
    <div className="flex flex-col gap-4 my-4 mx-4">
      {posts.length ===0 && <p>No posts found</p>}
    {posts?.map(card => 

     <Postcard key={card?._id} post={card} />
    )}
      </div>

{showMore && <Button onClick={handelShoreMore} gradientDuoTone={'purpleToBlue'} className='mx-auto'>Show More</Button>}

  </div>

  
}

export default Posts