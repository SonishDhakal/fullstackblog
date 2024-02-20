import React, { useState,useEffect } from "react";
import { TextInput, Button, Modal, useThemeMode } from "flowbite-react";
import { RiLockPasswordLine, RiMailLine, RiUser2Line } from "react-icons/ri";
;


const Signup = ({ setCurrentState }) => {
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

    const check = vcode.some((item) => item === "" || item === null);

    if (check) {
      console.log(check);
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
        setRemainingTime(5 * 60 * 1000)
        setIsStarted(true)
     
        
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
      const newUserId = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await newUserId.json();

      if (!newUserId.ok) {
        return console.log(data.message);
      } else {
        setUserId(data);
        sendVerificationCode();
        setModal(true);
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
          Signup from your account to use all
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
        <Button
          type="submit"
          gradientDuoTone={"redToYellow"}
          className="w-full"
          pill
        >
          Sign up
        </Button>

        <span>
          Don't have an account?{" "}
          <span
            className="text-red-400 cursor-pointer"
            onClick={() => setCurrentState("signin")}
          >
            Signin
          </span>
        </span>

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
      </form>
    </div>
  );
};

export default Signup;
