import React, { useEffect, useState } from 'react'
import Posts from '../components/Posts'
import Topbar from '../components/Home/Topbar'
import TopPosts from '../components/Home/TopPosts'
import TopTags from '../components/Home/TopTags'
import TopAuthor from '../components/Home/TopAuthor'
import {useLocation} from 'react-router-dom'

const Home = () => {
  const {search} = useLocation()


  const [tag,setTag] = useState(null);


  useEffect(() =>{
    const params = new URLSearchParams(search)

    const tags = params.get('tag');

    if(tags){
      setTag(tags)
    }
    else{
      setTag('')
    }



 



  },[search])



  return (tag || tag==='') &&
    <div className='flex container max-w-6xl mx-auto my-12 px-12 xl:px-0 gap-12'>
      <div className='flex-1 '>
        <Topbar setTag={setTag} search={tag}/>
<Posts search={`/?category=${tag}&limit=10`}/>

      </div>
      <div className="sidebar w-[300px] hidden  lg:flex flex-col gap-12 ">
        <TopPosts />
        <TopTags/>
        <TopAuthor />
      </div>

    </div>

  
}

export default Home