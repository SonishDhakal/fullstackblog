import React from 'react'
import TextEditorSidebar from '../components/write/TextEditorSidebar'
import TextEditor from '../components/write/TextEditor'

const Write = () => {
  return (
    <div className='container mx-auto flex gap-12 my-4 '>

        <TextEditor />
        <TextEditorSidebar />
    </div>

  )
}

export default Write