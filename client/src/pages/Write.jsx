import React, { useEffect, useState } from 'react'
import TextEditorSidebar from '../components/write/TextEditorSidebar'
import TextEditor from '../components/write/TextEditor'
import {useLocation,useNavigate} from 'react-router-dom'
import Preview from '../components/write/Preview'
import {useSelector}from 'react-redux'
import {v4 as uuid} from 'uuid'
import {Alert} from 'flowbite-react'
const Write = () => {

  const [form,setForm] = useState({})
  const [tab,setTab] = useState({})
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const {currentUser} = useSelector(state => state.user)


  


  useEffect(() =>{
    const urlParams =  new URLSearchParams(location.search)
    const tabFrom = urlParams.get('draft');
    const postId = urlParams.get('id')

    if(tabFrom===null){

      if(!postId){

        const id = uuid();

       return navigate(`/write?id=${id}`)
      }


      setForm(prevForm => ({...prevForm,postId,username:currentUser?.username}))
    }
    
    setTab(tabFrom)

  },[location,form.posdId,currentUser?.username])
  return tab==='preview' ? <Preview form={form && form} /> :
  <>
{error && <div className='container mx-auto mt-2'><Alert className='w-max' color={'failure'}>{error}</Alert></div>}
<div className='container mx-auto flex gap-12 my-4 '>
        <TextEditor error={error} setError={setError} form={form} setForm={setForm}  />
        <TextEditorSidebar loading={loading} setLoading={setLoading} error={error} setError={setError} form={form} setForm={setForm} />
    </div>
  </>
   

  
}

export default Write