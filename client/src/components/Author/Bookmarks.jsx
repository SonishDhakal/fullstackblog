import React, { useEffect, useState } from 'react'
import Postcard from '../Postcard';
import {useSelector} from 'react-redux'


const Bookmarks = () => {
  const [posts,setPosts] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const {currentUser} = useSelector(state => state.user)
  const [bookmarks,setBookmarks] = useState([])


  async function fetchBookmarks(id){

    setLoading(true);
    setError('')
    try{
      const res = await fetch(`/api/post/getposts?postId=${id}`)
      if(!res.ok){
        setLoading(false)
      return  setError(data.message)
      }
      const data = await res.json();
      setLoading(false)

      return data[0]



   






    }
    catch(e){
      setError(e.message)
      setLoading(false)

    }

  }


  async function fetchProfile(){
    if(currentUser){


    try{
      const res = await fetch(`/api/profile/mybookmarks`)
      const data = await res.json();

      if(!res.ok){

        setLoading(false)
      return  setError(data.message)
      }

    
     if(data?.bookmarks?.length>0){
     const post = await Promise.all(data.bookmarks.map(async pos=>{
      return fetchBookmarks(pos)
     } ))

     await setPosts(post)

     }




    }
    catch(e){

      setError(e.message)


    }
    }
    return
    

  }




  useEffect(() =>{
 fetchProfile()


  },[currentUser])
  return (
    <div className="flex flex-col gap-4">
      {posts?.map(card => 
      <Postcard key={card} post={card} />
        )}

      



    </div>

  )
}

export default Bookmarks