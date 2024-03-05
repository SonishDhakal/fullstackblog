import React, { useState,useEffect } from 'react'
import {Modal,TextInput,Button,Alert,Spinner} from 'flowbite-react'

const EmailVerification = ({modal,setModal,verifyCode,vcode, setVcode,email,codeId, setCoceId}) => {
  const [resend,setResend] = useState(false)
  const [loading,serLoading] = useState(false);
  const [error,setError] = useState(null)
  


  const [remainingTime, setRemainingTime] = useState(5 * 60 * 1000); // 5 minutes in milliseconds
  const [isStarted, setIsStarted] = useState(false);



  const minutes = Math.floor(remainingTime / (60 * 1000));
  const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);


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

 
  function handelCode(e) {
    const copyCode = [...vcode];

    copyCode[e.target.name] = e.target.value;
    setVcode(copyCode);
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
       

        setRemainingTime(5 * 60 * 1000)
        setIsStarted(true)
        setModal(true);
     
        
                setResend(false)
        return setCoceId(data);
      } else {
        console.log(data.message);
      }
    } catch (e) {
return
    }
  }
  return (
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
  )
}

export default EmailVerification