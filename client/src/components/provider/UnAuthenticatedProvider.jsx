import React, { useState } from 'react'
import {Outlet,Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
const UnAuthenticatedProvider = () => {
    const {currentUser} = useSelector(state => state.user)
   return currentUser ? (currentUser.onBoardingComplete ? <Navigate to={`/${currentUser.username}`} /> : <Navigate to={`/onboarding`} />): <Outlet />

  
}

export default UnAuthenticatedProvider