import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthorInfo } from "../components/Author/AuthorInfo";
import AuthorHome from "../components/Author/AuthorHome";

const Author = () => {
  const { authorId } = useParams();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [profile, setProfile] = useState();
  const [errorpage, setErrorPage] = useState();
  const [posts,setPosts] = useState();

  async function fetchPost(userId){
    setLoading(true);
    setError('')
    try{
      const res = await fetch(`/api/post/getposts?userId=${userId}`)
      if(!res.ok){
        setLoading(false)
      return  setError(data.message)
      }
      const data = await res.json();
      setPosts(data)




      setLoading(false)


    }
    catch(e){
      setError(e.message)
      setLoading(false)

    }

  }


  async function fetchUser() {

    setLoading(true);
    if (authorId) {
      try {
        const res = await fetch(`/api/profile/myprofile/${authorId}`);
        const data = await res.json();

        if (!res.ok) {
          setLoading(false);
          return setErrorPage(data.message);
        }
        setProfile(data);
        await  fetchPost(data.userId);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setErrorPage(e.message);
      }
    }
    return;
  }

  useEffect(() => {
    fetchUser();

  }, [authorId]);
  return errorpage ? (
    <p>ERor 404</p>
  ) : (
    !loading && (
      <div className="max-w-4xl mx-auto px-8 md:px-0">
        <div className="w-full my-4">
          {/* //nav section */}
        <AuthorInfo authorId={authorId} profile={profile} posts={posts} />
          <div className="content py-2">
            <AuthorHome posts={posts}  username={authorId} userId={profile?.userId}/>
          </div>
        </div>
      </div>
    )
  );
};

export default Author;
