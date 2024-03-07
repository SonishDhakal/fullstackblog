import React, { useState } from "react";
import {
  RiArrowLeftLine,
  RiCloseLine,
  RiEdit2Line,
  RiSettings2Line,
  RiUser2Line,
} from "react-icons/ri";
import ProfileSettings from "../settings/ProfileSettings";
import SecurityProfile from "../settings/SecurityProfile";
import AboutSettings from "../settings/AboutSettings";
import ChangeEmail from "../settings/ChangeEmail";
import ChangePassword from "../settings/ChangePassword";
import ChangeUsername from "../settings/ChangeUsername";
import ForgotPassword from "../settings/ForgotPassword";
const sidebars = [
  {
    name: "Profile",
    icon: <RiUser2Line />,
  },
  {
    name: "Security",
    icon: <RiSettings2Line />,
  },
  {
    name: "About",
    icon: <RiEdit2Line />,
  },
];
const AuthorSettings = ({ settings, setSettings, profile,setProfile }) => {
  const [currentState, setCurrentState] = useState("Profile");

  return (
    settings && (
      <div className="fixed top-0 left-0 h-screen w-screen bg-black/[0.3] ">
        <div className="fixed w-[300px] overflow-y-scroll h-full sm:w-[500px] md:w-[700px]   top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg dark:bg-[rgb(16,23,42)] ">
          <div className="border-b dark:border-b-gray-500 flex justify-between py-5 px-5 items-center">
            {currentState === "Profile" ||
            currentState === "Security" ||
            currentState === "About" ? (
              <h2 className="font-bold text-xl ">User Settings</h2>
            ) : (
              <RiArrowLeftLine
                className="cursor-pointer text-xl"
                onClick={() => setCurrentState("Security")}
              />
            )}
            <RiCloseLine
              onClick={() => setSettings(false)}
              className="text-2xl cursor-pointer"
            />
          </div>
          {/* //body */}
          <div className="flex flex-col sm:flex-row  h-full overflow-y-scroll">
            <ul className="border-r dark:border-r-gray-500  px-5 flex flex-row sm:flex-col py-5 gap-4 ">
              {sidebars.map((bar, index) => (
                <li
                  onClick={() => setCurrentState(bar.name)}
                  className={`${currentState === bar.name && "text-red-400"} ${
                    (currentState === "username" ||
                      currentState === "password" ||
                      currentState === "email") &&
                    index === 1 &&
                    "text-red-400"
                  } text-md cursor-pointer  text-left list-none flex items-center gap-2 `}
                  key={bar.name}
                >
                  {" "}
                  {bar.icon} <span>{bar.name}</span>
                </li>
              ))}
            </ul>
            <div className="flex-1 p-4 min-h-[400px] overflow-y-scroll ">
              {currentState === "Profile" ? (
                <ProfileSettings profile={profile} setProfile={setProfile} />
              ) : currentState === "Security" ? (
                <SecurityProfile setCurrentState={setCurrentState} />
              ) : currentState === "About" ? (
                <AboutSettings />
              ) : currentState === "email" ? (
                <ChangeEmail />
              ) : currentState === "password" ? (
                <ChangePassword setCurrentState={setCurrentState}/>
              ) : currentState==='username' ? (
                <ChangeUsername  />
              ): <ForgotPassword  />}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AuthorSettings;
