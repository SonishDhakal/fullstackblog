import React, { useState } from "react";
import { TextInput, Button, Modal } from "flowbite-react";
import { RiLockPasswordLine, RiMailLine, RiUser2Line } from "react-icons/ri";
import Countdown from "react-countdown";
const Signin = ({ setCurrentState }) => {
  const [modal, setModal] = useState(false);
  const [vcode, setVcode] = useState([]);

  const [form, setFrom] = useState({});

  const [userId, setUserId] = useState();
  const [codeId, setCoceId] = useState();

  const [isPaused, setIsPaused] = useState(true);
  const [resend, setResend] = useState(false);
  const [remainingTime, setRemainingTime] = useState(5 * 60 * 1000);


  async function verifyCode() {
    const finalCode = vcode.join("");

    const check = vcode.some((item) => item==='' || item===null)

    if (check) {
      return console.log("Add all the feilds");
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
        console.log(data);
      } else {
        console.log("Incorrect Verification Code");
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function sendVerificationCode(email) {
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
        setIsPaused(false);
        setResend(false)
        return setCoceId(data);
      } else {
        console.log(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handelSubmit(e) {
    e.preventDefault();

    try {
      const newUserId = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await newUserId.json();
      if(!newUserId.ok){
        return console.log(data.message)
      }
      if(data?.unverified){
        setUserId(data.userId);
        setFrom({...form, email:data.email})
       await sendVerificationCode(data.email);
        return setModal(true);

      }
      else{
        return console.log(data)
      }

     
    } catch (e) {
      console.log(e);
    }
  }

  function handelCode(e) {
    const copyCode = [...vcode];

    copyCode[e.target.name] = e.target.value;
    setVcode(copyCode);
  }

  return (
    <div className="shadow-xl  px-8 py-12 flex flex-col gap-12">
      <div>
        <h2 className="text-lf lg:text-2xl text-center">
          Signin from your account to use all
          <br /> the features!
        </h2>
      </div>
      <form onSubmit={handelSubmit} className="flex flex-col gap-4">
        <TextInput
          required
          onChange={(e) => setFrom({ ...form, value: e.target.value })}
          placeholder="Email or Username"
          icon={RiMailLine}

          id="email"
          min={4}
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
        <Button
          type="submit"
          gradientDuoTone={"redToYellow"}
          className="w-full"
          pill
        >
          Sign up
        </Button>

        <span>
          Don't have an account?
          <span
            className="text-red-400 cursor-pointer"
            onClick={() => setCurrentState("signup")}
          >
            Signup
          </span>
        </span>

     
      </form>
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
                <p onClick={() => sendVerificationCode(form.email)} className="text-center cursor-pointer mt-3 hover:underline">Resend Code</p>
              ) : (
                <Countdown 
                  date={Date.now() + remainingTime}
                  paused={isPaused}
                  onComplete={() => setResend(true)}
                  renderer={({minutes,seconds}) => (<span className="text-center block mt-2">The code expires in  {`${minutes}:${seconds}`}</span>)}
                />
              )}
            </Modal.Body>

            <div className="flex justify-between">
              <Button outline onClick={() => setModal(false)}>
                Change Email
              </Button>
              <Button onClick={verifyCode} gradientDuoTone={"purpleToBlue"}>
                Next
              </Button>
            </div>
          </div>
        </Modal>
    </div>
  );
};

export default Signin;
