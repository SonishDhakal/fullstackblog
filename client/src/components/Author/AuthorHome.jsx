import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import striptags from "striptags";
const AuthorHome = ({ userId, username, posts }) => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      {posts?.map((post) => (
        <div
          onClick={() => navigate(`/${username}/${post?.slug}`)}
          key={post._id}
          className="shadow-[0_3px_10px_rgb(0,0,0,0.2)]  flex md:flex-row  flex-col gap-4 rounded-md px-3 py-4 overflow-hidden cursor-pointer"
        >

            <img
              src={post.featuredImage}
              className="w-[250px] h-[140px] rounded-lg mx-auto"
            />

          <div className="flex flex-col gap-1 flex-1">

            <h1 className='fobt-bold text-xl'>{post?.title}</h1>
            <p className='text-gray-500'>{posts && striptags(post?.content).split(' ',35).join(' ')}</p>

            <div className="flex justify-between">
              <span className="text-sm text-gray-500">
                by{" "}
                <span className=" cursor-pointer text-md text-gray-800 dark:text-gray-300">
                  @{username}
                </span>
              </span>
              <span className="text-sm text-gray-500">
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuthorHome;
