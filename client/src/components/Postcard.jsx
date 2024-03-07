import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {useNavigate} from 'react-router-dom'
import striptags from "striptags";

const Postcard = ({post}) => {
    const [user,setUser] = useState('')
    const [error,setError] = useState(null)
const navigate = useNavigate();
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
  return (
    <div
          onClick={() => navigate(`/${user}/${post?.slug}`)}

          className="shadow-[0_3px_10px_rgb(0,0,0,0.2)]  flex md:flex-row  flex-col gap-4 rounded-md px-3 py-4 overflow-hidden cursor-pointer"
        >

            <img
              src={post?.featuredImage}
              className="w-[250px] h-[140px] rounded-lg mx-auto"
            />

          <div className="flex flex-col gap-1 flex-1">

            <h1 className='fobt-bold text-xl'>{post?.title}</h1>
            <p className='text-gray-500'>{post&& striptags(post?.content).split(' ',35).join(' ')}</p>

            <div className="flex justify-between">
              <span className="text-sm text-gray-500">
                by{" "}
                <span className=" cursor-pointer text-md text-gray-800 dark:text-gray-300">
                  @{user}
                </span>
              </span>
              <span className="text-sm text-gray-500">
                {moment(post?.createdAt).fromNow()}
              </span>
            </div>
          </div>
        </div>
  )
}

export default Postcard