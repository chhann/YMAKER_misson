import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserManagement from '../page/UserManagement/UserManagement'
import DetailUserInfo from '../page/DetailUserInfo/DetailUserInfo'

function AuthRoute() {

  return (
    <>
        <Routes>
            <Route path='/user/management' element={<UserManagement/>}/>
            <Route path='/user/detail' element={<DetailUserInfo/>}/>
        </Routes>
    </>
  )
}

export default AuthRoute
