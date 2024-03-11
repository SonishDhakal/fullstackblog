import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button,Modal, ModalHeader } from "flowbite-react";
import {useNavigate} from 'react-router-dom'
import Stats from "../Stats";

export const AuthorInfo = ({
  setProfile,
  profile,
  authorId,
  posts,
  changeState,
  currentState,
  setCurrentState,
  settings,
  setSettings,
}) => {
  const menu = ["Home", "About", "Bookmarks"];
  const { currentUser } = useSelector((state) => state.user);
  const [error,setError] = useState(null)
  const [user,setUser] = useState(null)
  const [stateState,setStatState]= useState('following')
  const [modal,setModal] = useState(false)
  const navigate = useNavigate()


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

      setProfile(data.authorProfiles)
      setUser(data.userProfiles)



      
      
    } catch (error) {
      setError(error.message)
      
    }
  }

  async function fetchUser() {


    if (authorId) {
      try {
        const res = await fetch(`/api/profile/myprofile/${currentUser.username}`);
        const data = await res.json();

        if (!res.ok) {

          return setError(data.message);
        }
        setUser(data);


      } catch (e) {

        setError(e.message);
      }
    }
    return;
  }

  useEffect(() =>{
    fetchUser()

  },[currentUser])

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex  justify-between sm:flex-row flex-col gap-4">
        <div className="flex gap-4 sm:flex-row flex-col ">
          <div className="flex gap-3 flex-col">
            <img
              className="w-40 h-40 rounded-lg contain"
              src={profile?.profilePicture}
            />
            <div className="text-gray-500 flex gap-2">
              <span>
                Joined {moment(profile?.createdAt).format("MMMM YYYY")}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 ">
            <h2 className="text-2xl md:text-4xl font-semibold">
              {profile?.firstName} {profile?.lastName}
            </h2>
            <p className="text-gray-400 font-semibold">@{authorId}</p>
            <div className="text-gray-500 flex gap-2">
              <span className="cursor-pointer" onClick={() =>{
                setStatState('followers')
                setModal(true)
              }}>{profile?.followers?.length} followers</span>
              <span className="cursor-pointer" onClick={() =>{
                setStatState('following')
                setModal(true)
              }}>{profile?.following?.length} following</span>
            </div>
            <span className="text-gray-500">{posts?.length} Posts</span>
            <p>{profile?.bio}</p>
          </div>
        </div>
        {currentUser && (currentUser?._id === profile?.userId ? (
          <div className="flex sm:self-end">
            <button
              onClick={() => setSettings(true)}
              className="border  rounded-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700  transition-all"
            >
              <span className="flex gap-3 items-center">
                <RiEdit2Line /> Edit Profile
              </span>
            </button>
          </div>
        ) : (
          <div className="flex sm:self-end">
            <button disabled={!user}
              onClick={() => handelFollow(profile?.userId)}
              className="border  rounded-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700  transition-all"
            >
               {user?.following.includes(profile.userId) ?<span className="flex gap-3 items-center">
                <FaMinus /> Unfollow
              </span> :<span className="flex gap-3 items-center">
                <FaPlus /> Follow
              </span>}
              
            </button>
          </div>
        ))}
      </div>
      <div>
        <ul className="border-b dark:border-gray-700 pb-[-200px] flex gap-4">
          {menu.map((item, index) =>
            item === "Bookmarks" ? (
              currentUser?._id===profile?.userId && (
                <li
                  id={item}
                  onClick={changeState}
                  key={index}
                  className={`${
                    currentState === item &&
                    "border-b border-gray-500 dark:border-gray-300 pb-3 -mb-[1px]"
                  } cursor-pointer`}
                >
                  {item}
                </li>
              )
            ) : (
              <li
                id={item}
                onClick={changeState}
                key={index}
                className={`${
                  currentState === item &&
                  'border-b border-gray-500 dark:border-gray-300 pb-3 -mb-[1px]'
                } cursor-pointer`}
              >
                {item}
              </li>
            )
          )}
        </ul>
      </div>
      <Modal show={modal} onClose={() => setModal(false)} size={'md'} className="" >
        <ModalHeader >{profile?.firstName}'s {stateState}</ModalHeader>

       <div className="border-b-2 dark:border-gray-700 pb-[-200px] flex gap-4 my-3">
         <span onClick={() => setStatState('followers')} className={`${
                 stateState === 'followers' &&
                 'border-b border-gray-500 dark:border-gray-300 pb-3 -mb-[1px]'
               } cursor-pointer flex-1 text-center`} >Followers</span>
          <span onClick={() => setStatState('following')} className={`${
                  stateState === 'following' &&
                  'border-b border-gray-500 dark:border-gray-300 pb-3 -mb-[1px]'
                } cursor-pointer flex-1 text-center`}  >Following</span>
        </div>
        <Modal.Body>
          {stateState==='following' ? 
          (<div className="flex flex-col gap-4">
            {profile?.following.length >0 ?
            (profile?.following.map(item =>
              <Stats users={user} setUsers={setUser} profile={profile} setProfile={setProfile} handelFollow={handelFollow} key={item} people={item}/>
              ))
             :<p>No following</p>}
          </div>) : (<div className="flex flex-col gap-4">
            {profile?.followers.length >0 ?
            (profile?.followers.map(item =>
              <Stats name={'followers'} users={user} setUsers={setUser} profile={profile} setProfile={setProfile} handelFollow={handelFollow} key={item} people={item}/>
              ))
             :<p>No followers</p>}


          </div>)}
          
        </Modal.Body>


      </Modal>
    </div>
  );
};
