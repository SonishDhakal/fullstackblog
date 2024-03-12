import React from 'react'
import Forgot from '../settings/ForgotPassword'
const ForgotPassword = ({setCurrentState}) => {
  return (
    <div className="shadow-xl  px-8 py-12 flex flex-col gap-12 border sm:w-[450px] w-[300px]">
<Forgot setCurrentState={setCurrentState}/>
      </div>

  )
}

export default ForgotPassword