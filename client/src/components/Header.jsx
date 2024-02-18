import React from 'react'
import {Button, Navbar, TextInput} from 'flowbite-react'
import {RiSearchLine,RiMoonLine} from 'react-icons/ri'

const Header = () => {
  return (
    <Navbar className='border-b h-[10vh]'>
        <div className='flex gap-2 items-center'>
        <Navbar.Brand as={'a'} href='/'>
            <img className='w-40' src='/logo.png' />
        </Navbar.Brand>
        <TextInput  icon={RiSearchLine} placeholder='Search' />
        </div>
        <div className='flex gap-3 items-center'>
        <Button pill color='gray'>
<RiMoonLine />
</Button>
<Button className=' w-28 hover:text-white' gradientDuoTone={'redToYellow'} pill outline>Sign In</Button>

        </div>

    </Navbar>

  )
}

export default Header