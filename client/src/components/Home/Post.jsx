import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
const Post = ({post}) => {
    const [user,setUser] = useState('')
    const [error,setError] = useState(null)

    async function fetchUser(){
        try{
            const res = await fetch(`/api/user/getUsername/${post.userId}`);
const data=  await res.json();
            if(!res.ok){
               return setError(data.message)
            }

            setUser(data.username)

        }
        catch(e){
            setError(e.message)
        }
    }

    useEffect(() =>{
       if(post){
        fetchUser()
       }

    },[post])


  return user &&
<Link to={`/${user}/${post.slug}`} className='hover:underline'>
        <h2 className='truncate font-semibold'>{post.title}</h2>

      </Link>
  
}

export default Post