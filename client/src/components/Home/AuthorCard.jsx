import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthorCard = ({ author }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [user, setUser] = useState({});
  const [users, setUsers] = useState({});
  const [error, setError] = useState();
  const navigate = useNavigate();

  async function handelFollow() {
    if (!currentUser) {
      navigate("/auth");
    }
    setError(null);
    try {
      const res = await fetch(`/api/profile/follow/${author.userId}`);
      const data = await res.json();

      if (!res.ok) {
        return setError(data.message);
      }

      console.log(data.userProfiles);

      setUsers(data.userProfiles);
    } catch (error) {
      setError(error.message);
    }
  }

  async function fetchUser() {
    try {
      const res = await fetch(`/api/user/getUsername/${author.userId}`);
      const data = await res.json();
      if (!res.ok) {
        return setError(data.message);
      }

      setUser(data.username);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [author]);

  async function fetchUsers() {
    try {
      const res = await fetch(`/api/profile/myprofile/${currentUser.username}`);
      const data = await res.json();

      if (!res.ok) {
        return;
      }

      setUsers(data);
    } catch (e) {
      return;
    }
  }

  useEffect(() => {
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);
  return (
    currentUser.username !== user && (
      <div className="flex items-center justify-between">
        <Link to={`/${user}`} className="flex items-center gap-4 flex-1">
          <img src={author.profilePicture} className="w-10 h-10 rounded-full" />
          <div className="flex gap flex-col">
            <p className="font-semibold">
              {author.firstName} {author.lastName}
            </p>
            <span className="truncate w-[70%]">{author.bio}</span>
          </div>
        </Link>
        <Button
          onClick={() => handelFollow()}
          color="green"
          className="w-20 h-10"
        >
          {users?.following?.includes(author?.userId) ? "Unfollow" : "Follow"}
        </Button>
      </div>
    )
  );
};

export default AuthorCard;
