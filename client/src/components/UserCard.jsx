import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Button} from 'flowbite-react'
const UserCard = ({ userId }) => {
  const [profile, setProfile] = useState();

 

  async function fetchProfile() {
    try {
      const res = await fetch(`/api/profile/get/${userId}`);
      const data = await res.json();

      if (res.ok) {

        return setProfile(data);
      }

      return;
    } catch (e) {
      return;
    }
  }
  useEffect(() => {
    fetchProfile();
  }, [userId]);
  return profile && <Link to={`/${profile.username}`} className='flex justify-between items-center'>
 <div className="flex items-center gap-4">
 <img src={profile.profilePicture} className='w-20 h-20 rounded-full' />
  <div className='flex gap flex-col'>
      <p className='font-semibold'>{profile.firstName} {profile.lastName}</p>
      <span>@{profile.username}</span>
      <span>{profile.bio}</span>
  </div>
 </div>
  <Button  color='green' className='w-20 h-10'>Follow</Button>
</Link>
};

export default UserCard;
