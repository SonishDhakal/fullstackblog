import React from 'react'
import {Avatar, Button, Dropdown, Navbar, TextInput} from 'flowbite-react'
import {RiSearchLine,RiMoonLine, RiSunLine} from 'react-icons/ri'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { signoutSuccess } from '../redux/user/userSlice'
import { changeTheme } from '../redux/theme/themeSlice'
const Header = () => {

  const {currentUser} = useSelector(state => state.user)
  const {theme} = useSelector(state => state.theme)
  
const dispatch = useDispatch()

  async function handleSignout(){
    const res = await fetch('/api/auth/signout');
    if(res.ok){
      dispatch(signoutSuccess())
    }
    
  }
  return (
    <Navbar className='border-b border-2 bg-transparent '>
        <div className='flex gap-2 items-center'>
        <Navbar.Brand as={'a'} href='/'>
            <img className='md:w-36 w-20' src='/logo.png' />
        </Navbar.Brand>
        <TextInput   icon={RiSearchLine} placeholder='Search '  className='hidden lg:flex'  />
        <Button color='gray' pill className='flex lg:hidden w-10 h-10'>
          <RiSearchLine  />
        </Button>
        </div>
        <div className='flex gap-3 items-center'>
   
          {theme === 'light'?      <Button  onClick={() => dispatch(changeTheme())} className='w-10 h-10' pill color='gray'> <RiMoonLine /> </Button> :     <Button  onClick={() => dispatch(changeTheme())} className='w-10 h-10' pill color='gray'><RiSunLine  /> </Button>}



{currentUser ? 
<Dropdown 
arrowIcon={false}
inline
label={<Avatar alt='user settings'  img={currentUser.profilePicture ? currentUser.profilePicture : '/user.png'} rounded />} >
  <Dropdown.Header>
    <span className='font-semibold'>@{currentUser.username}</span>
<p className='truncate text-gray-400'>{currentUser.email}</p>
  </Dropdown.Header>
  <Dropdown.Item>Profile</Dropdown.Item>
  <Dropdown.Item>Dashboard</Dropdown.Item>
  <Dropdown.Item>Settings</Dropdown.Item>
  <Dropdown.Item onClick={handleSignout}>Signout</Dropdown.Item>

</Dropdown>
 : <Link to={'/auth'}><Button className=' w-28 hover:text-white' gradientDuoTone={'redToYellow'} pill outline>Sign In</Button></Link>}


        </div>

    </Navbar>

  )
}

export default Header