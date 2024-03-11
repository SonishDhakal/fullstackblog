import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
const AuthorCard = ({author}) => {

const [user,setUser] = useState('')
const [error,setError] = useState();
    async function fetchUser(){
        try{
            const res = await fetch(`/api/user/getUsername/${author.userId}`);
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

        fetchUser()


    },[author])
  return (
    <Link to={`/${user}`} className='flex items-center gap-4'>
        <img src={author.profilePicture} className='w-10 h-10 rounded-full' />
        <div className='flex gap flex-col'>
            <p className='font-semibold'>{author.firstName} {author.lastName}</p>
            <span>{author.bio}</span>
        </div>
    </Link>

  )
}

export default AuthorCard