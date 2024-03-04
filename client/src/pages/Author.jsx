import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthorInfo } from "../components/Author/AuthorInfo";
import AuthorHome from "../components/Author/AuthorHome";
import {Button} from 'flowbite-react'
import AuthorAbout from "../components/Author/AuthorAbout";
import Bookmarks from "../components/Author/Bookmarks";
import AuthorSettings from "../components/Author/AuthorSettings";

const Author = () => {
  const { authorId } = useParams();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [profile, setProfile] = useState();
  const [errorpage, setErrorPage] = useState();
  const [posts,setPosts] = useState();
  const [showMore,setShowMore] = useState(false);
  const [currentState, setCurrentState] = useState("Home");
  const [settings,setSettings] = useState(false)
  function changeState(e) {
    setCurrentState(e.target.id);
  }

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
      <div className="">
        <div className="max-w-4xl mx-auto px-8 md:px-0">
        <div className="w-full my-4">
          {/* //nav section */}
        <AuthorInfo setSettings={setSettings} settings={settings}  currentState={currentState} changeState={changeState} setCurrentState={setCurrentState} authorId={authorId} profile={profile} posts={posts} />
          <div className="content py-2">
      
{currentState ==='Home' ?   <><AuthorHome posts={posts}  username={authorId} userId={profile?.userId}/> {showMore && <div className='flex justify-center mt-5'>
  <Button onClick={handelShoreMore} color='blue'>Show More</Button>
</div>} </> : currentState==='About' ?
<AuthorAbout /> : <Bookmarks />}

          </div>
        </div>
        
      </div>
      <AuthorSettings profile={profile} setSettings={setSettings} settings={settings} />
      </div>
    )
  );
};

export default Author;
