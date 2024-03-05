import React, { useState, useEffect } from "react";
import { Alert, Button,Spinner,TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
const ForgotPassword = () => {
  const [state, setState] = useState("initial");
  const { currentUser } = useSelector((state) => state.user);
  const [codeId, setCodeId] = useState();
  const [resend, setResend] = useState(false);
  const [vcode,setVcode] = useState([])
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const [success,setSuccess] = useState(null)
  const [password,setPassword] = useState(null)


  const [remainingTime, setRemainingTime] = useState(5 * 60 * 1000); // 5 minutes in milliseconds
  const [isStarted, setIsStarted] = useState(false);

  const minutes = Math.floor(remainingTime / (60 * 1000));
  const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);


  async function changePass(){
    setLoading(true)
    setError(null)

    const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if(!PasswordRegex.test(password)){
      setLoading(false)
return setError('New Password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special symbol.')

    }

   

    try{

      const res = await fetch('/api/user/forgotpassword',{
        method:"POST",
        headers:{
          'Content-type': 'application/json'
        },
        body:JSON.stringify({password})
      })

      const data = await res.json()

      if(!res.ok){
        setLoading(false)
        return setError(data.message)

      }

      setLoading(false)
      setSuccess(true)

      


    }
    catch(e){
      setLoading(false)
      setError(e.message)
    }
  }

  async function verifyCode() {
    setLoading(true)

    const finalCode = vcode.join("");

    const check = vcode.some((item) => item === "" || item === null);

    if (check) {

        setLoading(false)
      return setError("Add all four digits");
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
        setLoading(false)
setState('end')
      } else {
        setLoading(false)
        setError(data.message)
      }
    } catch (e) {
        setLoading(false)
        setError(e.message)

    }
  }

  async function sendVerificationCode() {

    setLoading(true)

    try {
      const res = await fetch("/api/verificationcode/send", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: currentUser.email }),
      });

      const data = await res.json();

      if (res.ok) {
        setRemainingTime(5* 60 * 1000);
          setIsStarted(true);
        setState("mid");
        setLoading(false)

        setResend(false);
        return setCodeId(data);
      } else {
        setLoading(false)
setError(data.message)
      }
    } catch (e) {
        setError(e.message)
setLoading(false)
    }
  }


  function handelCode(e) {
    const copyCode = [...vcode];

    copyCode[e.target.name] = e.target.value;
    setVcode(copyCode);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isStarted) {
        setRemainingTime((prevTime) => Math.max(0, prevTime - 1000));
        if (remainingTime <= 0) {
          setResend(true);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [ isStarted, remainingTime]);
  return (
    <div className="flex flex-col gap-4">
      <h2>Forgot Passoword</h2>
      {state === "initial" ? (
        <div className="px-10 flex flex-col justify-center text-center gap-4 ">
          <p>
            {" "}
            A four digit digit Verificaion Code Will be sent to your registered
            Email adress.
          </p>
          <div className="flex justify-center">
            <Button
            disabled={loading}
              onClick={sendVerificationCode}
              outline
              pill
              className="w-28"
            >
              {loading ? <Spinner /> : 'Send'}
            </Button>
          </div>{" "}
        </div>
      ) : state === "mid" ? (
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
        </div>
      ) : (
        <div>
            <TextInput onChange={(e) => setPassword(e.target.value)} placeholder="New Password"/>
            <Button disabled={(!password || loading)} onClick={changePass} className="my-3 flex mx-auto" outline>Change Password</Button>
            {success && <Alert color={'success'}>Password Changed Successfully</Alert>}
            {error && <Alert color={'failure'}>{error}</Alert>}
            

        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
