import React, { useEffect, useState } from 'react'
import AuthorCard from './AuthorCard';

const TopAuthor = () => {
  const [author,setAuthor] = useState([])
const [error,setError] = useState(null);
  async function fetchAuthor(){
    try{
      const res = await fetch("/api/profile/randomprofiles")
      const data = await res.json()
      if(res.ok){
        return setAuthor(data)
      }
      setError(data.message)

    }
    catch(e){
      setError(e.message)
    }
  }
  useEffect(() =>{
    fetchAuthor();

  },[])
  return author &&
<div>
  <h2 className='text-center mb-4 font-semibold'>Suggested Users</h2>
  <div className='flex flex-col gap-4'>
    {author.map(item => <AuthorCard   key={item.userId} author={item} />)}
  </div>
</div>
  
}

export default TopAuthor