import React, { useState,useEffect } from "react";
import { TextInput, Button, Modal, useThemeMode, Spinner,Alert } from "flowbite-react";
import { RiLockPasswordLine, RiMailLine, RiUser2Line } from "react-icons/ri";
import {useSelector,useDispatch} from 'react-redux'
import {signUpSuccess,signUpStart,signUpFailure,signupCreated} from '../../redux/user/userSlice' 
import {useNavigate} from 'react-router-dom'
import OAuth from "./OAuth";


const Signup = ({ setCurrentState }) => {

  const navigate = useNavigate()

  const {loading,error} = useSelector(state => state.user)

  const dispatch = useDispatch()


  const [modal, setModal] = useState(false);
  const [vcode, setVcode] = useState([]);

  const [form, setFrom] = useState({});

  const [userId, setUserId] = useState();
  const [codeId, setCoceId] = useState();
  const [resend, setResend] = useState(false);

  const [remainingTime, setRemainingTime] = useState(5 * 60 * 1000); // 5 minutes in milliseconds
  const [isStarted, setIsStarted] = useState(false);



  const minutes = Math.floor(remainingTime / (60 * 1000));
  const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);


  async function verifyCode() {
    const finalCode = vcode.join("");

    dispatch(signUpStart())

    const check = vcode.some((item) => item === "" || item === null);

    if (check) {
      console.log(check);
      return dispatch(signUpFailure('Add all four digits'))
    }

    try {
      const res = await fetch("/api/verificationcode/check", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ code: finalCode, codeId, userId }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signUpSuccess(data))
        navigate('/onboarding')

      } else {
        dispatch(signUpFailure('Incorrect Code'))
      }
    } catch (e) {
      dispatch(signUpFailure(e.message))

    }
  }

  async function sendVerificationCode() {
    try {
      const res = await fetch("/api/verificationcode/send", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await res.json();

      if (res.ok) {
       
        dispatch(signupCreated())
        setRemainingTime(5 * 60 * 1000)
        setIsStarted(true)
        setModal(true);
     
        
                setResend(false)
        return setCoceId(data);
      } else {
        console.log(data.message);
      }
    } catch (e) {
dispatch(signUpFailure(e.message))
    }
  }

  async function handelSubmit(e) {
    e.preventDefault();
    dispatch(signUpStart())


   



    const regex = /^[a-zA-Z0-9_]+$/; 
    if (!regex.test(form.username)) {
return dispatch(signUpFailure('Username can only contain letters, numbers, and no spaces'))
    }

    const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if(!PasswordRegex.test(form.password)){
return dispatch(signUpFailure('Password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special symbol.'))

    }

    let username = form.username





    

    try {
      const newForm = { ...form, username: username.toLowerCase() };
      const newUserId = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newForm),
      });

      const data = await newUserId.json();

      if (!newUserId.ok) {
        return dispatch(signUpFailure(data.message))
      } else {
        
        setUserId(data);
        sendVerificationCode();
        
      }
    } catch (e) {
dispatch(signUpFailure(e.message))
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
        setRemainingTime(prevTime => Math.max(0, prevTime - 1000));
        if (remainingTime <= 0) {
          setResend(true)

        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isStarted,remainingTime]);

  return (
    <div className="shadow-xl  px-8 py-12 flex flex-col gap-12">
      <div>
        <h2 className="text-lf lg:text-2xl text-center">
          Create a new account and enjoy all
          <br /> the features!
        </h2>
      </div>
      <form onSubmit={handelSubmit} className="flex flex-col gap-4">
        <TextInput
          required
          minLength={4}
          maxLength={16}
          onChange={(e) => setFrom({ ...form, username: e.target.value })}
          placeholder="Username"
          icon={RiUser2Line}
          type="text"
          id="username"
        />
        <TextInput
          required
          onChange={(e) => setFrom({ ...form, email: e.target.value })}
          placeholder="Email"
          icon={RiMailLine}
          type="email"
          id="email"
        />
        <TextInput
          required
          minLength={8}
          maxLength={16}
          onChange={(e) => setFrom({ ...form, password: e.target.value })}
          icon={RiLockPasswordLine}
          placeholder="password"
          id="passowrd"
          type="password"
        />
        <Button disabled={loading}
          type="submit"
          gradientDuoTone={"redToYellow"}
          className="w-full"
          pill
        >
        {loading ? <Spinner /> : 'Sign up'}
        </Button>
        <OAuth />

        <span>
          Don't have an account?{" "}
          <span
            className="text-red-400 cursor-pointer"
            onClick={() => setCurrentState("signin")}
          >
            Signin
          </span>
        </span>
        {!modal && error && <Alert className=" max-w-[350px] mx-auto" color={'failure'}>{error}</Alert> }

        <Modal
          className=""
          size={"sm"}
          show={modal}
          onClose={() => setModal(false)}
        >
          <div className="p-4">
            <h3 className="text-xl font-bold text-gray-700 text-center">
              Email Verification
            </h3>
            <Modal.Body>
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

              {error && <Alert className="text-center mt-2 " color={'failure'}>{error}</Alert>}
            </Modal.Body>

            <div className="flex justify-between">
              <Button outline onClick={() => setModal(false)}>
                Change Email
              </Button>
              <Button disabled={loading} onClick={verifyCode} gradientDuoTone={"purpleToBlue"}>
                {loading ? <Spinner /> : 'Next'}
              </Button>
            </div>
          </div>
        </Modal>
      </form>
    </div>
  );
};

export default Signup;
