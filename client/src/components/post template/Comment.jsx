import React, { useEffect, useState } from "react";
import { RiHeart2Line } from "react-icons/ri";
import {MdOutlineDelete} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import moment from "moment";
const Comment = ({ currentUser, comment, setComments, comments,authorId }) => {
  const [writer, setWriter] = useState({});
  const [error, setError] = useState("");
  
  const navigate = useNavigate()

  async function handelDelete() {
    try{
      const res = await fetch(`/api/comment/delete/${comment._id}`, {method:'DELETE'})
      const data = await res.json()
      if(!res.ok){
        setError(data.message)
        return
      }


      const indexof = comments.indexOf(comment);

      const newComments = [...comments];
      newComments.splice(indexof,1)

      setComments(newComments);

      

    }
    catch(e){
      setError(e.message)
    }
  }

  async function fetchUser() {
    try {
      const res = await fetch(`/api/profile/get/${comment.userId}`);
      const data = await res.json();

      if (!res.ok) {
        return;
      }
      setWriter(data);
    } catch (e) {
      return;
    }
  }

  async function handelLikes() {
    if(!currentUser){
      navigate('/auth')

    }

    setError("");
    try {
      const res = await fetch(`/api/comment/like/${comment._id}`);
      const data = await res.json();

      if (!res.ok) {
        return setError(data.message);
      }

      const indexof = comments.indexOf(comment);
      console.log(indexof);
      const newComments = [...comments];
      newComments[indexof] = data;

      setComments(newComments);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {

    fetchUser();
  }, [comment]);
  return (
    <div  className="flex flex-col gap-2 border-b pb-3 group">
      <Link to={`/${writer.username}`} className="flex items-center gap-3">
        <img
          className="w-10 h-10 rounded-full"
          src={writer.profilePicture}
          alt="user"
        />
        <div className="flex flex-col ">
          <span className="font-semibold">
            {writer.firstName} {writer.lastName}
          </span>
          <span className="text-gray-500">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
      </Link>
      <div>
        <p className="text-gray-500">{comment.content}</p>
      </div>
      <div className="flex gap-2 items-center">
        <span className="flex items-center gap-1">
          <RiHeart2Line
            onClick={handelLikes}
            className={`cursor-pointer text-lg  ${
              comment?.likes?.includes(currentUser?._id) && "text-red-500"
            } `}
          />{" "}
          {comment.likes.length}
        </span>
       {currentUser && <span> {((currentUser._id === comment.userId) || (currentUser._id===authorId)) &&  (
          <MdOutlineDelete
            onClick={handelDelete}
            className="text-red-400 text-lg cursor-pointer hidden group-hover:flex transition-all"
          />
        )}</span>}
      </div>
    </div>
  );
};

export default Comment;
