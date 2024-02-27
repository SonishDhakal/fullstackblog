import React, { useEffect, useState } from 'react'
import {  RiBookmark2Line, RiChat1Line, RiHeart2Line, RiShareForward2Line  } from 'react-icons/ri'
import {useParams} from 'react-router-dom'
import {Spinner} from 'flowbite-react'
import moment from 'moment'
import {useSelector} from 'react-redux'
const PostTemplate = () => {
  const {slug} = useParams()
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const [post,setPost] = useState({})
  const {currentUser} = useSelector(state => state.user)
  const [writer,setWriter] = useState({}) 
  const [profile,setProfile] = useState({})

  async function fetchProfile(){
    setLoading(true)
    try{
      const res = await fetch(`/api/profile/myprofile`)
      const data = await res.json();

      if(!res.ok){
        setLoading(false)
      return  setError(data.message)
      }
      setProfile(data)
      setLoading(false)


    }
    catch(e){
      setError(e.message)
      setLoading(false)

    }

  }

  async function handelBookmarks(){
    try{
      const res = await fetch(`/api/profile/addbookmark/${post.postId}`);
      const data = await res.json();

      if(!res.ok){

      return setError(data.message)
      }

      setProfile(data)
      


    }
    catch(e){
setError(e.message)
    }
  }

  async function fetchUser(userId){
    try{
      const res = await fetch(`/api/profile/get/${userId}`)
      const data = await res.json();

      if(!res.ok){
        setLoading(false)
      return  setError(data.message)
      }
      setWriter(data)
      setLoading(false)


    }
    catch(e){
      setError(e.message)
      setLoading(false)

    }
    
  }

  async function fetchPost(){
    setLoading(true);
    setError('')
    try{
      const res = await fetch(`/api/post/getposts?slug=${slug}`)
      if(!res.ok){
        setLoading(false)
      return  setError(data.message)
      }
      const data = await res.json();
      setPost(data[0])
     await fetchUser(data[0].userId)
      setLoading(false)


    }
    catch(e){
      setError(e.message)
      setLoading(false)

    }

  }


  async function handelLikes(){

    setError('')
    try{
      const res = await fetch(`/api/post/like/${post.postId}`)
      const data = await res.json();

      if(!res.ok){

      return setError(data.message)
      }
      
      setPost(data)



    }
    catch(e){
      setError(e.message)


    }

  }

  useEffect(() =>{
    fetchPost()
    fetchProfile()

  },[slug])

  return loading ? <Spinner /> : (
    error ? <p>{error}</p> : <div className="container  mx-auto px-8 md:px-0 max-w-3xl my-8">
    <div>
      {/* //full contaien */}
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-6 '>
        <span className='bg-gray-300 dark:bg-gray-600 p-1 w-max'>{post.category}</span>
        <h1 className='font-bold text-xl md:text-[3rem] leading-[3.2rem] text-center'>{post.title}</h1>
        <div className=" flex gap-4 items-center">
        <div className=''>
          <img src={writer.profilePicture}  className='w-16 h-16 rounded-full'/>
    
        </div>
        <div className='flex-col gap-0 flex'>
          <h3 className=''>{`${writer.firstName} ${writer.lastName}`}</h3>
          <div className='flex gap-3 '>
            <span>{((post?.content?.length/5)/200).toFixed()} min read</span>
            <span>{moment(post.createdAt).fromNow()}</span>
          </div>
        </div>
        </div>
        <div className="tab border-b border-t dark:border-gray-800  py-3 flex justify-between items-center">
          <div className='flex items-center gap-2'>
            <span className='flex items-center gap-1'><RiHeart2Line  onClick={handelLikes} className={`cursor-pointer text-lg ${(post?.likes?.includes(currentUser?._id)) && 'text-red-500' }`}/> {post?.likes?.length}</span>
            <span className='flex items-center gap-1'><RiChat1Line className='text-lg'/>20</span>
          </div>
          <div className='flex items-center gap-2'>
         <span className='flex gap-1 items-center'>   <RiBookmark2Line onClick={handelBookmarks} className={`cursor-pointer text-lg ${(profile?.bookmarks?.includes(post?.postId)) && 'text-blue-500' }`}/>{profile?.bookmarks?.length}</span>
<RiShareForward2Line className='cursor-pointer text-lg'/>
          </div>
    
        </div>
        </div>
       <div>
        <div className='max-w-2xl  mx-auto mb-4'>
          <img src={post.featuredImage} className='max-h-[600px] w-full' />
        </div>
       <div className="content postContainer" dangerouslySetInnerHTML={{__html:post && post.content}}>
          {/* /Content */}
        </div>
       </div>
       <div className='flex gap-4'>
        {post.tags && post.tags.map((tag) => <span className='bg-gray-300 dark:bg-gray-600 p-2 rounded-md w-max' key={tag}>{tag}</span>)}
       </div>
      </div>
      
    
    
    
    
    </div>
    </div>
    
      )
}

export default PostTemplate