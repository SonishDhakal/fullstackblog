import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
const TopTags = () => {
  const [tags,setTags] = useState([]);
  const [error,setError] = useState(null)

  async function fetchTags(){
    try{
      const res = await fetch('/api/post/tags');
      const data = await res.json();
      if(!res.ok){
        return setError(data.message)
      }
      
      setTags(data)

    }
    catch(e){
      setError(e.message)
    }
  }

  useEffect(() =>{
    fetchTags()

  },[])
  return tags &&
<div>
  <h2 className='text-center font-semibold text-lg '>Top Topics</h2>
  <div className='flex flex-wrap gap-3 mt-2'>
  {tags.map(item => 
    <Link className='bg-gray-100 dark:bg-gray-800 rounded-full py-1 px-2' key={item}>{item}</Link>)}
  </div>
  

</div>
  
}

export default TopTags