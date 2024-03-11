import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import Topbar from '../components/Home/Topbar'
import Posts from '../components/Posts'
import Users from '../components/Users'

const menu = ['search', "users", "category"]

const Search = () => {
    const [query,setQuery] = useState()
  const [tag,setTag] = useState(null);

    const {search} = useLocation()

    useEffect(() =>{
        const params = new URLSearchParams(search)
        const querys = params.get('q')
        const tags = params.get('in')
        setQuery(querys)
if(!tags){
    setTag('search')
}
else{
    setTag(tags)
}

    },[search])
    
  return (
    <div className='flex container max-w-6xl mx-auto my-12 px-12 xl:px-0 gap-12 f'>
       <div className='flex-col flex gap-4 w-full'>
       <h2 className='text-xl'>Results for <span className='font-bold'>{query}</span></h2>
        <Topbar link={`?q=${query}&in=`} menu={menu} setTag={setTag} search={tag}/>
        {(tag && query) && ((tag==='users') ? <Users query={query} />  :  <Posts search={`/?${tag}=${query}&limit=10`}/>)}


       </div>
    </div>

  )
}

export default Search