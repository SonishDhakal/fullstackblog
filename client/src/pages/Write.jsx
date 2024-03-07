import React, { useEffect, useState } from 'react'
import TextEditorSidebar from '../components/write/TextEditorSidebar'
import TextEditor from '../components/write/TextEditor'
import {useLocation,useNavigate} from 'react-router-dom'
import Preview from '../components/write/Preview'
import {useSelector}from 'react-redux'
import {v4 as uuid} from 'uuid'
import {Alert, Button, Spinner} from 'flowbite-react'

const Write = () => {

  const [form,setForm] = useState({})
  const [tab,setTab] = useState({})
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const {currentUser} = useSelector(state => state.user)

  async function fetchPost(postId){

    setLoading(true);
    setError('')
    
    try{
      const res = await fetch(`/api/post/getposts?postId=${postId}&published=false`)
      if(!res.ok){
        


        setLoading(false)
      return  setError(data.message)
      }


      const data = await res.json();

      if(data.length===0){
        setForm(prevForm => ({...prevForm,postId,username:currentUser?.username}))
return setLoading(false)
      }

      if(data[0].userId !== currentUser._id){
        return navigate('/')
      }

      setForm({...data[0],postId,username:currentUser?.username})
      return setLoading(false)


    }
    catch(e){


      setError(e.message)
      setLoading(false)

    }

  }



  


  useEffect(() =>{

    const urlParams =  new URLSearchParams(location.search)
    const tabFrom = urlParams.get('draft');
    const postId = urlParams.get('id')

    if(tabFrom===null){

      if(!postId){

        const id = uuid();

       return navigate(`/write?id=${id}`)
      }


      fetchPost(postId)





    }
    
    setTab(tabFrom)

  },[tab])
  return tab==='preview' ? <Preview form={form && form} /> :
  <>
{error && <div className='container mx-auto mt-2'><Alert className='w-max' color={'failure'}>{error}</Alert></div>}
{loading ? <div className="w-screen h-screen grid place-content-center"><Spinner /></div> : <div className='px-4 md:px-0 container mx-auto flex gap-12 my-4 flex-col  md:flex-row '>
        <TextEditor error={error} setError={setError} form={form} setForm={setForm}  />
        <TextEditorSidebar loading={loading} setLoading={setLoading} error={error} setError={setError} form={form} setForm={setForm} />
    </div>}

  </>
   

  
}

export default Write