import React, { useEffect, useState } from 'react'
import TextEditorSidebar from '../components/write/TextEditorSidebar'
import TextEditor from '../components/write/TextEditor'
import {useLocation,useNavigate} from 'react-router-dom'
import Preview from '../components/write/Preview'
import {v4 as uuid} from 'uuid'
const Write = () => {

  const [form,setForm] = useState({})
  const [tab,setTab] = useState({})
  const location = useLocation()
  const navigate = useNavigate()

  


  useEffect(() =>{
    const urlParams =  new URLSearchParams(location.search)
    const tabFrom = urlParams.get('draft');
    const posdId = urlParams.get('id')

    if(tabFrom===null){

      if(!posdId){

        const id = uuid();

       return navigate(`/write?id=${id}`)
      }

      setForm(prevForm => ({...prevForm,posdId}))
    }
    
    setTab(tabFrom)

  },[location,form.posdId])
  return tab==='preview' ? <Preview form={form && form} /> :
    <div className='container mx-auto flex gap-12 my-4 '>

        <TextEditor form={form} setForm={setForm}  />
        <TextEditorSidebar form={form} setForm={setForm} />
    </div>

  
}

export default Write