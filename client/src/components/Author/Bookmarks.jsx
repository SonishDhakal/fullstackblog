import React, { useEffect, useState } from 'react'
import Postcard from '../Postcard';
import {useSelector} from 'react-redux'
import {Alert,Spinner} from 'flowbite-react' 

const Bookmarks = () => {
  const [posts,setPosts] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const {currentUser} = useSelector(state => state.user)
  const [bookmarks,setBookmarks] = useState([])
  const [empty,setEmpty] = useState('')


  async function fetchBookmarks(id){


  
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
    setLoading(true);
    setError('')
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
     setLoading(false)

     }
     else{
      setLoading(false)
      setEmpty("Your bookmarks will appear here")
     }




    }
    catch(e){

      setError(e.message)
      setLoading(false)



    }
    }else{
      setError('Something went wrong')
      setLoading(false)

    }
    return
    

  }




  useEffect(() =>{
 fetchProfile()


  },[currentUser])
  return loading ? <div className="w-full h-[40vh] grid place-content-center"><Spinner /></div> :

    <div className="flex flex-col gap-4">
 {error &&    <Alert color={'failure'}>{error}</Alert>}
 {empty && <p>{empty}</p>}

      {posts?.map(card => 
      <>
     {card &&  <Postcard key={card?._id} post={card} />}
   
      </>
      
        )}

      



    </div>

  
}

export default Bookmarks