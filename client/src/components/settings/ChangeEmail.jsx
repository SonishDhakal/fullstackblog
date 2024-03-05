import React, { useEffect, useState } from 'react'
import {Alert, Button,Spinner,TextInput} from 'flowbite-react'
import {useSelector,useDispatch} from 'react-redux'
import { signUpFailure, updateUserFailure, signupCreated, updateUserStart, updateUserSuccess } from '../../redux/user/userSlice'

const ChangeEmail = () => {
  const [email,setEmail] = useState('')
  const {currentUser,loading,error} = useSelector(state => state.user)
  const [state,setState] = useState('initial')
  const [success,setSuccess] = useState(null)
  const [codeId, setCodeId] = useState();
  const [resend, setResend] = useState(false);
  const [vcode,setVcode] = useState([])
const dispatch = useDispatch()
  const [remainingTime, setRemainingTime] = useState(5 * 60 * 1000); // 5 minutes in milliseconds
  const [isStarted, setIsStarted] = useState(false);

  const minutes = Math.floor(remainingTime / (60 * 1000));
  const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

 useEffect(() =>{
  setEmail(currentUser.email)


 },[currentUser]) 

  useEffect(() =>{
    const intervalId = setInterval(() => {
      if (isStarted) {
        setRemainingTime((prevTime) => Math.max(0, prevTime - 1000));
        if (remainingTime <= 0) {
          setResend(true);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);


  },[isStarted,remainingTime])

  async function checkEmail(e){
    e.preventDefault()

dispatch(updateUserStart())

    try{
      const res = await fetch("/api/user/checkEmail",{
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if(!res.ok){
    return  dispatch(updateUserFailure('Email already in use'))
        
      }

     await sendVerificationCode()

    }
    catch(e){
      dispatch(updateUserFailure(e.message))
    }
  }


  async function sendVerificationCode() {


    try {
      const res = await fetch("/api/verificationcode/send", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setRemainingTime(5* 60 * 1000);
          setIsStarted(true);
        setState("mid");

dispatch(signupCreated())
        setResend(false);
        return setCodeId(data);
      } else {
        dispatch(updateUserFailure(data.message))


      }
    } catch (e) {
      dispatch(updateUserFailure(e.message))

       
    }
  }

  function handelCode(e) {
    const copyCode = [...vcode];

    copyCode[e.target.name] = e.target.value;
    setVcode(copyCode);
  }

  async function verifyCode() {
dispatch(updateUserStart())

    const finalCode = vcode.join("");

    const check = vcode.some((item) => item === "" || item === null);

    if (check) {


      return dispatch(updateUserFailure('Add all four digits'))
    }

    try {
      const res = await fetch("/api/verificationcode/check", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ code: finalCode, codeId, userId:currentUser._id }),
      });

      const data = await res.json();

      if (res.ok) {

        await updateEmail();


      } else {
dispatch(updateUserFailure(data.message))

      }
    } catch (e) {
      dispatch(updateUserFailure(e.message))


    }
  }


  async function updateEmail(){
    try{
      const res = await fetch('/api/user/updateEmail',{
        method:'Post',
        headers:{
          'Content-type' : 'application/json'
        },
        body: JSON.stringify({email})
        
      })
      const data = await res.json()

      if(!res.ok){
return dispatch(updateUserFailure(data.message))

        
      }

      dispatch(updateUserSuccess({...currentUser, email}))
      setState('initial')
      setSuccess("Email updated Successfully")

      

      

    }
    catch(e){
      dispatch(updateUserFailure(e.message))

    }

  }



  return (
   <div>
     {state ==='initial' ? <form onSubmit={checkEmail} className="flex flex-col gap-4">
      <h2>Change Email</h2>
      <div className="flex flex-col gap-3">
        <TextInput onChange={(e) => setEmail(e.target.value)} required type="email" value={email} />
      </div>
      <Button type="submit"
      disabled={(currentUser.email===email || loading || email.length===0)}

        gradientDuoTone={"purpleToPink"}
        className="self-end"

      >

        {loading ? <Spinner /> : 'Update Email'}
      </Button>
      {success && <Alert color={'success'}>{success}</Alert>}
      {error && <Alert color={'failure'}>{error}</Alert>}

      </form>
      : 
      <div className="w-[50%] mx-auto">
                       <div className="flex gap-4">
                <TextInput
                  maxLength={1}
                  name="0"
                  onChange={(e) => handelCode(e)}
                />
                <TextInput
                  maxLength={1}
                  name="1"
                  onChange={(e) => handelCode(e)}
                />
                <TextInput
                  maxLength={1}
                  name="2"
                  onChange={(e) => handelCode(e)}
                />
                <TextInput
                  maxLength={1}
                  name="3"
                  onChange={(e) => handelCode(e)}
                />
              </div>
              {resend ? (
                <p onClick={() => sendVerificationCode()} className="text-center cursor-pointer mt-3 hover:underline">Resend Code</p>
              ) : (

<p className="text-center mt-5">Verification Code Expires in <span className="text-semibold">{minutes}:{seconds.toString().padStart(2, '0')}</span></p>

              )}

              <Button disabled={loading} onClick={verifyCode} className="my-3 flex mx-auto" outline>{loading ? <Spinner/> : 'Verify'}</Button>
              {error && <Alert color={'failure'}>{error}</Alert>}
        </div>}
   </div>
  )
}

export default ChangeEmail