import React, { useEffect, useState } from 'react'
import {  RiBookmark2Line, RiChat1Line, RiCopyleftLine, RiHeart2Line, RiLink, RiShareForward2Line  } from 'react-icons/ri'
import {useParams} from 'react-router-dom'
import {Spinner} from 'flowbite-react'
import moment from 'moment'

import {useSelector} from 'react-redux'
import Sidebar from '../components/post template/Sidebar'
const PostTemplate = () => {
  const {slug} = useParams()
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const [post,setPost] = useState({})
  const {currentUser} = useSelector(state => state.user)
  const [writer,setWriter] = useState({}) 
  const [profile,setProfile] = useState({})
  const [commentBar,setCommentBar] = useState(false)
  const [comments,setComments] = useState([]);

  async function fetchComment(postId){
    try{
      const res = await fetch(`/api/comment/getcomments/${postId}`);
      const data = await res.json();

      if(res.status===204){
       return setComments(null)
      }

      if(!res.ok){
        return setError(data.message)
      }

      return setComments(data)

      


    }
    catch(e){
      setError(e.message)
    }
    
  }

  async function fetchProfile(){
    if(currentUser){

    try{
      const res = await fetch(`/api/profile/myprofile/${currentUser.username}`)
      const data = await res.json();

      if(!res.ok){
        setLoading(false)
      return  setError(data.message)
      }
      setProfile(data)



    }
    catch(e){
      setError(e.message)


    }
    }
    return
    

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
  await fetchProfile()
  await fetchComment(data[0].postId)

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

  },[slug])

  return loading ? <Spinner /> : (
    error ? <p>{error}</p> : <div className='relative'>
      <Sidebar authorId={post.userId} comments={comments} setComments={setComments} postId={post.postId} commentBar={commentBar} setCommentBar={setCommentBar} currentUser={currentUser} />
      {commentBar && <div className='fixed top-0 left-0 h-full w-screen bg-black/[0.05] dark:bg-black/[0.2] z-40'>

</div>}

<div className="container  mx-auto px-8 md:px-0 max-w-3xl py-8">
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
            <span className='flex items-center gap-1'><RiChat1Line onClick={() => setCommentBar(true)} className='text-lg'/>{comments && comments.length}</span>
          </div>
          <div className='flex items-center gap-2'>
         <span className='flex gap-1 items-center'>   <RiBookmark2Line onClick={handelBookmarks} className={`cursor-pointer text-lg ${(profile?.bookmarks?.includes(post?.postId)) && 'text-blue-500' }`}/>{profile?.bookmarks?.length}</span>

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
    </div>
    
      )
}

export default PostTemplate