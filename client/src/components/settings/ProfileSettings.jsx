import React from 'react'
import { Button, TextInput,Select, Textarea } from 'flowbite-react'
const ProfileSettings = ({profile}) => {
  return (
    <div>
        <form className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
                <div className='flex gap-2 flex-col items-center'>
                <label htmlFor="avatar">Avatar</label>
                <img className='w-20'  src={profile?.profilePicture} alt="" id="avatar" p/>
                </div>
                <div>
              
<Button outline pill color='gray'>Upload Image</Button>
                </div>
            </div>
            <div>
                <label htmlFor="firstName">First Name</label>
                <TextInput required value={profile?.firstName} />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <TextInput required value={profile?.lastName} />
            </div>
            <div>
                <label htmlFor="gender">Gender</label>
                <Select value={profile?.gender} id='gender'>
                    <option value={'undefined'}>Rather not say</option>
                    <option value={'male'}>Male</option>
                    <option value={'female'}>Female</option>
                </Select>
            </div>
            <div>
                <label htmlFor="bio">Bio</label>
                <Textarea required value={profile?.bio} className='resize-none h-32' />
            </div>
        </form>

    </div>

  )
}

export default ProfileSettings