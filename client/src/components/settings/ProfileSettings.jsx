import React, { useEffect, useRef, useState } from "react";
import { Button, TextInput, Select, Textarea, Alert, Spinner } from "flowbite-react";
import {useSelector,useDispatch} from  'react-redux'
import { signupCreated, updateUserFailure, updateUserStart, updateUserSuccess } from "../../redux/user/userSlice";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../utils/Firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProfileSettings = ({ profile, setProfile }) => {
    const imageREf = useRef()
    const [image,setImage] = useState({});
    const dispatch = useDispatch();
    const {loading,error,currentUser} = useSelector(state => state.user)
    const [imageProgress,setImageProgress] = useState()
    const [tempProfile,setTempProfile] = useState()


    function handleImageChange(e){

        setImage({
            url:URL.createObjectURL(e.target.files[0]),
            file:e.target.files[0]

        })

        console.log(e)

        


    }


    function uploadImage(){
        dispatch(updateUserStart())
        if(!image.file){
          return  dispatch(updateUserFailure("No Image selected"))

        }
        if((image.file.size/(1024*1024)).toFixed(2) >=2){

           return dispatch(updateUserFailure("File size cannot excede 2mb"))

        }

        const fileName = new Date().getTime() + image.file.name
        const storageRef = ref(storage,fileName);
        const uploadTask = uploadBytesResumable(storageRef, image.file);

        uploadTask.on('state_changed', (snapshot) =>{
const progress = (snapshot.bytesTransferred/snapshot.totalBytes) *100
setImageProgress(progress.toFixed(2))

        },(error) =>{
            dispatch(updateUserFailure(error.message))
        },
        () =>{
            getDownloadURL(uploadTask.snapshot.ref).then((url) =>{
                setProfile({...profile, profilePicture:url})
                console.log(url)
                dispatch(signupCreated())
                setImageProgress(null)
                setImage(null)

            })
        }
        )







    }

    async function handelSubmit(e){
        e.preventDefault();
        dispatch(updateUserStart())

        try{
            const res = await fetch('/api/profile/update',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify(profile)
            })
            const data = await res.json();
            if(!res.ok){
               return dispatch(updateUserFailure(data.message))

            }

            dispatch(updateUserSuccess({...currentUser,profilePicture:profile.profilePicture}))
            setTempProfile({...profile})


        }
        catch(e){
            dispatch(updateUserFailure(e.message))
        }

    }



function handelChange(e){
    setProfile({...profile,[e.target.id]:e.target.value})
}


useEffect(() =>{
    setTempProfile(profile)
},[])


  return (
    <div>
      <form onSubmit={handelSubmit} className="flex flex-col gap-4">
        {error && <Alert color={'failure'}>{error}</Alert>}
        <div className="flex items-center gap-4 w-full">
          <div className="flex gap-2 flex-col items-center ">
            <label htmlFor="avatar" className="font-semibold">Avatar</label>
           <div className="w-24 h-24 rounded-full overflow-hidden cursor-pointer relative">
            <input   onChange={handleImageChange} className="hidden" ref={imageREf} type="file" accept="image/*"  />
            {imageProgress && <CircularProgressbar

value={imageProgress || 0}
strokeWidth={3}
text={`${imageProgress}%`}
styles={{
    root:{
        top:0,
        left:0,
        width:'100%',
        height:'100%',
        position:"absolute",
        color:'red'

    },
    path:{
        stroke:`rgba(255,76,48, ${imageProgress/100})`
    }
}}
 />}
           <img
              className="w-full h-full "
              src={image?.url ? image?.url  : profile?.profilePicture}
              alt=""
              id="avatar"
              onClick={() =>imageREf.current.click()}
            
              

            />
           </div>
          </div>
          <div>
            <Button disabled={(!image || loading)} onClick={uploadImage} outline pill color="gray">
           {loading ?   <Spinner /> : 'Upload Image'}
            </Button>
          </div>
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <TextInput onChange={handelChange} id="firstName" required value={profile?.firstName} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <TextInput onChange={handelChange} id="lastName" required value={profile?.lastName} />
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <Select onChange={handelChange} id="gender" value={profile?.gender} id="gender">
            <option value={"undefined"}>Rather not say</option>
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
          </Select>
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <Textarea onChange={handelChange} id="bio"
            required
            value={profile?.bio}
            className="resize-none h-32"
          />
        </div>
        <Button type="submit" disabled={(loading || profile===tempProfile)} className=" self-end" gradientDuoTone={'purpleToBlue'}>Save Profile</Button>
      </form>
    </div>
  );
};

export default ProfileSettings;
