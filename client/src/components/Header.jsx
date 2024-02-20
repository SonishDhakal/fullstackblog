import React from 'react'
import {Avatar, Button, Dropdown, Navbar, TextInput} from 'flowbite-react'
import {RiSearchLine,RiMoonLine} from 'react-icons/ri'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
const Header = () => {
  const {currentUser} = useSelector(state => state.user)
  return (
    <Navbar className='border-b h-[10vh]'>
        <div className='flex gap-2 items-center'>
        <Navbar.Brand as={'a'} href='/'>
            <img className='w-40' src='/logo.png' />
        </Navbar.Brand>
        <TextInput  icon={RiSearchLine} placeholder='Search '  className='hidden lg:flex' />
        <Button color='gray' pill className='flex lg:hidden w-10 h-10'>
          <RiSearchLine  />
        </Button>
        </div>
        <div className='flex gap-3 items-center'>
        <Button className='w-10 h-10' pill color='gray'>
<RiMoonLine />
</Button>
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
  <Dropdown.Item>Signout</Dropdown.Item>

</Dropdown>
 : <Link to={'/auth'}><Button className=' w-28 hover:text-white' gradientDuoTone={'redToYellow'} pill outline>Sign In</Button></Link>}


        </div>

    </Navbar>

  )
}

export default Header