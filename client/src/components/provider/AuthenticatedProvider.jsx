import React, { useState } from 'react'
import {Outlet,Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
const AuthenticatedProvider = () => {
    const {currentUser} = useSelector(state => state.user)
   return currentUser ? <Outlet /> : <Navigate to={'/auth'} />

  
}

export default AuthenticatedProvider