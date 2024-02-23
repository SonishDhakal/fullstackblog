import React, { useEffect, useState } from 'react'
import TextEditorSidebar from '../components/write/TextEditorSidebar'
import TextEditor from '../components/write/TextEditor'
import {useLocation,} from 'react-router-dom'
import Preview from '../components/write/Preview'
const Write = () => {

  const [form,setForm] = useState({})
  const [tab,setTab] = useState({})
  const location = useLocation()

  


  useEffect(() =>{
    const urlParams =  new URLSearchParams(location.search)
    const tabFrom = urlParams.get('draft');
    setTab(tabFrom)

  },[location])
  return tab==='preview' ? <Preview form={form && form} /> :
    <div className='container mx-auto flex gap-12 my-4 '>

        <TextEditor form={form} setForm={setForm}  />
        <TextEditorSidebar form={form} setForm={setForm} />
    </div>

  
}

export default Write