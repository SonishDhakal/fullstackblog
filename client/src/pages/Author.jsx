import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthorInfo } from "../components/Author/AuthorInfo";
import AuthorHome from "../components/Author/AuthorHome";
import {Button} from 'flowbite-react'

const Author = () => {
  const { authorId } = useParams();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [profile, setProfile] = useState();
  const [errorpage, setErrorPage] = useState();
  const [posts,setPosts] = useState();
  const [showMore,setShowMore] = useState(false);

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
      if(data.length ===5){
        setShowMore(true)
  
      }




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


  async function handelShoreMore(){

    const startIndex = posts.length;
    try{
      const res = await fetch(`/api/post/getposts?userId=${profile.userId}&startIndex=${startIndex}`)
      if(!res.ok){

      return  setError(data.message)
      }
      const data = await res.json();
      setPosts([...posts, ...data])
      if(data.length ===5){
        setShowMore(true)
  
      }
      else{
        setShowMore(false)
      }
      

    }
    catch(e){
      setError(e.message)
    }
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

{showMore && <div className='flex justify-center mt-5'>
  <Button onClick={handelShoreMore} color='blue'>Show More</Button>
</div>}
          </div>
        </div>
      </div>
    )
  );
};

export default Author;
