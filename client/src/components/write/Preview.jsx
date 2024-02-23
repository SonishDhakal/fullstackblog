import React from 'react'
import {Navigate} from 'react-router-dom'
const Preview = ({form}) => {
    console.log(form)
  return Object.keys(form).length!==0 ? 
    <div>Preview</div>
    : 
    <Navigate to='/write' />
  
}

export default Preview