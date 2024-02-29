import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { Button } from "flowbite-react";
import Comment from "./Comment";
import { Link } from "react-router-dom";
const Sidebar = ({ currentUser,commentBar, setCommentBar,postId,comments, setComments,authorId }) => {
    const [content,setContent] = useState('')
    const [error,setError] = useState()


    async function addComments(){
      setError('')
      try{
        if(content.length > 0 && content.length<201){
          const form = {
            postId,
            content
          }
          const res = await fetch("/api/comment/addcomment", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(form),
          });

          const data = await res.json()
          if(!res.ok){
            return setError(data.message)
          }
          return setComments([data ,...comments])


          
        }
       return setError("Comment should have a length between 1 and 200")

      }
      catch(e){
        setError(e.message)

      }
    }
  return (
    <div className={`${commentBar ? 'right-0' : 'right-[-100%]'} transition-all fixed top-0 bg-white dark:bg-[rgb(16,23,42)] w-[350px] h-[100vh] overflow-y-scroll z-50  shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded px-5 py-8 flex flex-col gap-12`}>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-xl">Comments {comments?.length}</h3>
          <RiCloseLine onClick={() => setCommentBar(false)} className="cursor-pointer text-2xl" />
        </div>
      {currentUser ?   <div className=" shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col gap-3 p-3">
          <div className="flex gap-2">
            <img
              className="w-10 h-10 rounded-full"
              src={currentUser?.profilePicture}
              alt="user"
            />
            <span className="font-semibold">@{currentUser?.username}</span>
          </div>
          <div>
            <textarea value={content} onChange={(event) => { const updatedBio = event.target.value.substring(0, 200);
                setContent(updatedBio);}} className=" bg-transparent resize-none w-full h-16 border-transparent focus:border-transparent focus:ring-0" placeholder="Write a response.." />
          </div>
          <div className="flex justify-end">
            <Button onClick={addComments} size={"sm"} className="text-sm " outline>
              Comment
            </Button>
          </div>
         <span className="text-gray-400 mt-2 block">{content ? 200 - content.length :'200'} Characters remaining</span>

        </div>: <span><Link className="text-blue-400" to={'/auth'}>Signin</Link> to Comment</span>}
      </div>

      {/* //commetns loop */}
  <div className="flex gap-8  flex-col">
    {comments.length > 0  ? comments.map(comment => <Comment authorId={authorId} comments={comments} setComments={setComments} key={comment._id} comment={comment}  currentUser={currentUser} /> ) : <p>No Comments</p>}

      
  </div>
    </div>
  );
};

export default Sidebar;
