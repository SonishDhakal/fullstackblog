import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

const UserCard = ({ userId }) => {
  const [profile, setProfile] = useState();
  const [user, setUser] = useState({});

  const [error, setError] = useState();
  const navigate = useNavigate();

  async function handelFollow() {
    if (!currentUser) {
      navigate("/auth");
    }
    setError(null);
    try {
      const res = await fetch(`/api/profile/follow/${userId}`);
      const data = await res.json();

      if (!res.ok) {
        return setError(data.message);
      }

      console.log(data.userProfiles);

      setUser(data.userProfiles);
    } catch (error) {
      setError(error.message);
    }
  }

  const { currentUser } = useSelector((state) => state.user);

  async function fetchUsers() {
    try {
      const res = await fetch(`/api/profile/myprofile/${currentUser.username}`);
      const data = await res.json();

      if (!res.ok) {
        return;
      }

      setUser(data);
    } catch (e) {
      return;
    }
  }

  useEffect(() => {
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

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
  return (
    currentUser.username !== profile.username &&
    profile && (
      <div className="flex justify-between items-center">
        <Link to={`/${profile.username}`} className="flex items-center gap-4">
          <img
            src={profile.profilePicture}
            className="w-20 h-20 rounded-full"
          />
          <div className="flex gap flex-col">
            <p className="font-semibold">
              {profile.firstName} {profile.lastName}
            </p>
            <span>@{profile.username}</span>
            <span>{profile.bio}</span>
          </div>
        </Link>
        <Button
          onClick={() => handelFollow()}
          color="green"
          className="w-20 h-10"
        >
          {user?.following?.includes(userId) ? "Unfollow" : "Follow"}
        </Button>
      </div>
    )
  );
};

export default UserCard;
