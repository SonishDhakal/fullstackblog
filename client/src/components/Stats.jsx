import React, { useEffect, useState } from 'react'
import {Button} from 'flowbite-react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const Stats = ({people,users,setUsers,setProfile,name,profile}) => {

    const [user,setUser] = useState();
    const [error,setError] = useState();
    const {currentUser} = useSelector(state => state.user)
    const navigate = useNavigate()
console.log(users)

    async function fetchuser(){
        const res = await fetch(`/api/user/getuserProfile/${people}`);
        const data = await res.json();

        if(!res.ok){
            setError(data.message)

        }

        setUser(data)


    }

    useEffect(() =>{
        fetchuser()

    },[people])

    async function handelFollow(profileId){
        if(!currentUser){
          navigate('/auth')
        }
        setError(null)
        try {
          const res = await fetch(`/api/profile/follow/${profileId}`)
          const data = await res.json();
    
          if(!res.ok){
           return setError(data.message)
          }

          console.log(data.userProfiles.following)
          if(data?.userProfiles._id ===profile._id){
            console.log('gg')
            setProfile({...profile, following:data.userProfiles.following,followers:data.userProfiles.followers})
            
          }

    


          setUsers({...users, following:data.userProfiles.following,followers:data.userProfiles.followers})


    
    
    
          
          
        } catch (error) {
          setError(error.message)
          
        }
      }
    async function handelRemove(profileId){
        if(!currentUser){
          navigate('/auth')
        }
        setError(null)
        try {
          const res = await fetch(`/api/profile/removefollow/${profileId}`)
          const data = await res.json();
    
          if(!res.ok){
           return setError(data.message)
          }

          console.log(data.userProfiles.following)
          if(data?.userProfiles._id ===profile._id){
            console.log('removinhg')
            setProfile({...profile, following:data.userProfiles.following,followers:data.userProfiles.followers})
            
          }

    


          setUsers({...users, following:data.userProfiles.following,followers:data.userProfiles.followers})


    
    
    
          
          
        } catch (error) {
          setError(error.message)
          
        }
      }


  return (
   user &&  <div className='flex justify-between items-center'>
   <Link to={`/${user.username}`} className='flex items-center gap-2'>
       <img className='w-10 h-10 rounded-full' src={user?.profilePicture} />
       <div className='flex flex-col gap-0'>
           <h3>{user?.firstName} {user?.lastName}</h3>
           <p className='text-gray-500 text-sm'>{user?.username}</p>
       </div>
   </Link>

{(name ==='followers' && currentUser._id===profile.userId) ?  <Button onClick={() => handelRemove(people)} color='green' className='w-20 h-10'>Remove</Button>
: (currentUser?.username!==user?.username && <Button onClick={() => handelFollow(people)} color='green' className='w-20 h-10'>{(users?.following?.includes(people)) ?'Unfollow':'Follow'}</Button>)

  }</div>

  )
}

export default Stats