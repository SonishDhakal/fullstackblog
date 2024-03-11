import React, { useEffect, useState } from 'react'
import UserCard from './UserCard';

const Users = ({query}) => {

  const [error,setError] = useState(null);
  const [users,SetUsers] = useState([])

  async function fetchUsers(){
    try{
      const res = await fetch(`api/profile/searchprofile?search=${query}`)
      const data = await res.json();

      if(res.ok){
        return SetUsers(data)
      }
      setError(data.message)

    }
    catch(e){
      setError(e.message)
    }
  }

  useEffect(() =>{
    fetchUsers();

  },[query])

  

  return users && <div className='flex flex-col gap-8'>
    {users.length > 0 ?users.map(item => <UserCard key={item} userId={item}/>) : <p>No user Found</p>}
  </div>

  
}

export default Users