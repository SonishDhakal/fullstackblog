import React, { useRef, useState } from "react";
import {
  Alert,
  Button,
  Checkbox,
  Label,
  Select,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { storage } from "../utils/Firebase";
import {useNavigate,Navigate} from 'react-router-dom'
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {useDispatch,useSelector} from 'react-redux'
import { signUpFailure, signUpStart, signUpSuccess, signupCreated } from "../redux/user/userSlice";
const OnBoarding = () => {
  const navigate = useNavigate()
  const {currentUser,loading,error} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [form, setForm] = useState({});
  const [tempImage, setTempImage] = useState({});
  const [imageuploadProgress, setImageUploadProgress] = useState("");
  const imageRef = useRef();


  function handelChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handelImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setTempImage({ url: URL.createObjectURL(file), file });
    }
  }

  function uploadImage() {
    if (!tempImage.file) {
      return;
    }
    dispatch(signUpStart())

    const fileName = new Date().getTime() + tempImage.file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, tempImage.file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
dispatch(signUpFailure(error.message))
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setForm({ ...form, profilePicture: downloadUrl });
          setImageUploadProgress(null)
          dispatch(signupCreated())
        });
      }
    );
  }


  async function handelSubmit(e){
    e.preventDefault()

    dispatch(signUpStart())
    const flatObject = { ...form, userId: currentUser._id };
    try{
     

      const res = await fetch('/api/profile/create', {
        method:'POST',
        headers:{
          'Content-type': 'application/json'
        },
        body: JSON.stringify(flatObject)

      })

      const data = await res.json();

      if(!res.ok){
        return dispatch(signUpFailure(data.message))
      }
      dispatch(signUpSuccess(data))
      navigate(`/${currentUser.username}`)

      








    }
    catch(e){
dispatch(signUpFailure(e.message))
    }
  }
  return currentUser.onBoardingComplete ? <Navigate to='/' /> :
    <div className="min-h-[90vh] w-screen grid place-content-center ">
      <form onSubmit={handelSubmit} className=" p-5 flex flex-col gap-4 rounded-lg overflow-hidden shadow-xl border-gray-600 border" >
        <div className="flex flex-col md:flex-row gap-4 items-center md:justify-between">
          <div
            onClick={() => imageRef.current.click()}
            className="w-28 h-28 cursor-pointer overflow-hidden rounded-full relative"
          >
            <input
              type="file"
              accept="image/*"
              ref={imageRef}
              onChange={handelImageChange}
              className="hidden"
            />
            {imageuploadProgress && <CircularProgressbar

            value={imageuploadProgress || 0}
            strokeWidth={3}
            text={`${imageuploadProgress}%`}
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
                    stroke:`rgba(183,244,216, ${imageuploadProgress/100})`
                }
            }}
             />}
           <div className="w-full">
           <img
              className="w-28 h-28 object-cover"
              src={tempImage.url ? tempImage.url : "/user.png"}
            />
           </div>
          </div>
          {!tempImage.file ? (
            <p className="text-gray-500">
              Upload your image or Use <br /> deafult image
            </p>
          ) : (
            <Button onClick={uploadImage} gradientDuoTone={"purpleToBlue"}>
              Upload Image
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex  gap-4">
            <TextInput required
              onChange={handelChange}
              placeholder="first name"
              name="firstName"
            />
            <TextInput required
              onChange={handelChange}
              placeholder="last name"
              name="lastName"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="gender">
              Gender
            </label>
            <Select name="gender" onChange={handelChange}>
              <option value={"undefined"}>Rather not say</option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </Select>
          </div>
          <div>
            <Textarea
            required
              onChange={(event) => {
                const updatedBio = event.target.value.substring(0, 200);
                setForm((prevState) => ({ ...prevState, bio: updatedBio }));
               

               

              }}

              value={form.bio}

              name="bio"
              className="p-3 resize-none"
              placeholder="Your Bio"
            />
            <span className="text-gray-400 mt-2 block">{form.bio ? 200 - form.bio.length :'200'} Characters remaining</span>
          </div>
     
          <div className="flex justify-end">
            <Button disabled={loading} type="submit" className="w-20" gradientDuoTone={'purpleToPink'}>{loading ? <Spinner /> :
            'Save'}</Button>
          </div>
          {error && <Alert color={'failure'}>{error}</Alert>}
        </div>
      </form>
    </div>
  
};

export default OnBoarding;
