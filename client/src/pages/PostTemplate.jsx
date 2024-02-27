import React, { useEffect, useState } from 'react'
import {  RiBookmark2Line, RiChat1Line, RiHeart2Line, RiShareForward2Line  } from 'react-icons/ri'
import {useParams} from 'react-router-dom'
import {Spinner} from 'flowbite-react'
const PostTemplate = () => {
  const {slug} = useParams()
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const [post,setPost] = useState({})

  async function fetchPost(){
    setLoading(true);
    setError('')
    try{
      const res = await fetch(`/api/post/getposts?slug=${slug}`)
      if(!res.ok){
        setLoading(false)
      return  setError(res.statusText)
      }
      const data = await res.json();
      setPost(data[0])
      setLoading(false)


    }
    catch(e){
      setError(e.message)
      setLoading(false)

    }

  }

  useEffect(() =>{
    fetchPost()

  },[slug])

  return loading ? <Spinner /> : (
    error ? {error} : <div className="container  mx-auto px-8 md:px-0 max-w-3xl my-8">
    <div>
      {/* //full contaien */}
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-6 '>
        <span className='bg-gray-300 dark:bg-gray-600 p-1 w-max'>{post.category}</span>
        <h1 className='font-bold text-xl md:text-[3rem] leading-[3.2rem] text-center'>{post.title}</h1>
        <div className=" flex gap-4 items-center">
        <div className=''>
          <img src='/user.png'  className='w-10'/>
    
        </div>
        <div className='flex-col gap-0 flex'>
          <h3 className=''>Sonish Dhakal</h3>
          <div className='flex gap-3 '>
            <span>5 Min read</span>
            <span>3 days ago</span>
          </div>
        </div>
        </div>
        <div className="tab border-b border-t dark:border-gray-800  py-3 flex justify-between items-center">
          <div className='flex items-center gap-2'>
            <span className='flex items-center gap-1'><RiHeart2Line className='text-lg'/> 8,444</span>
            <span className='flex items-center gap-1'><RiChat1Line className='text-lg'/>20</span>
          </div>
          <div className='flex items-center gap-2'>
            <RiBookmark2Line className='text-lg'/>
<RiShareForward2Line className='text-lg'/>
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