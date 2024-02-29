import React from 'react'
import { useState } from 'react';
export const AuthorInfo = ({profile,authorId,posts}) => {
  console.log(posts)
  const [currentState, setCurrentState] = useState("Home");
  const menu = ["Home", "About", "Featured", "Bookmarks"];

  function changeState(e) {
    setCurrentState(e.target.id);
  }
  return (
    <div className="flex flex-col gap-4 ">
    <div className="flex  gap-6 ">
      <div className="flex gap-3 flex-col">
        <img
          className="w-40 h-40 rounded-lg"
          src={profile?.profilePicture}
        />
          <div className="text-gray-500 flex gap-2">
          <span>{posts?.length} Posts</span>

        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-2xl md:text-4xl font-semibold">
          {profile?.firstName} {profile?.lastName}
        </h2>
        <p className="text-gray-400 font-semibold">@{authorId}</p>
        <div className="text-gray-500 flex gap-2">
          <span>{profile?.followers?.length} followers</span>
          <span>{profile?.followers?.length} following</span>
        </div>
        <p>{profile?.bio}</p>
      
      </div>
    </div>
    <div>
      <ul className="border-b dark:border-gray-700 pb-[-200px] flex gap-4">
        {menu.map((item) => (
          <li
            id={item}
            onClick={changeState}
            key={item}
            className={`${
              currentState === item &&
              "border-b border-gray-500 dark:border-gray-300 pb-3 -mb-[1px]"
            } cursor-pointer`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
  )
}
