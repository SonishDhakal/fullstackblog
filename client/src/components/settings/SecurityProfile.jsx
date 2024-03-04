import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
const SecurityProfile = ({ setCurrentState }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Update Your Security</h3>
      <ul className="flex flex-col list-none gap-3 ">
      <li
          onClick={() => setCurrentState("email")}
          className=" flex  gap-2 text-md hover:text-red-500 cursor-pointer justify-between"
        >
          Email <span>{currentUser.email}</span>
        </li>
        <li
          onClick={() => setCurrentState("username")}
          className=" flex  gap-2 text-md hover:text-red-500 cursor-pointer justify-between"
        >
          Username <span>@{currentUser.username}</span>
        </li>
       
        <li
          onClick={() => setCurrentState("password")}
          className=" flex  gap-2 text-md hover:text-red-500 cursor-pointer"
        >
          Password 
        </li>
        
      </ul>
    </div>
  );
};

export default SecurityProfile;
