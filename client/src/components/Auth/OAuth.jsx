import React, { useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "../../redux/user/userSlice";
import { auth } from "../../utils/Firebase";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function handelOAuth() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    dispatch(signUpStart);
    try {
      const account = await signInWithPopup(auth, provider);
      const { user } = account;
      const form = {
        displayName: user.displayName,
        email: user.email,
      };

      const res = await fetch("/api/auth/oauth", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        return dispatch(signUpFailure(data.message));
      }

      if (!data.onBoardingComplete) {
        dispatch(signUpSuccess(data));
        return navigate("/onboarding");
      }

      dispatch(signUpSuccess(data));
      navigate(`/author/${data.username}?tab=profile`);
    } catch (e) {
      dispatch(signUpFailure(e.message));
    }
  }

  return (
    <Button
      disabled={loading}
      onClick={handelOAuth}
      className=""
      pill
      outline
    >
      {loading ? <Spinner /> : <span className="flex gap-3 items-center"><FaGoogle /> Signin With Google</span>}
    </Button>
  );
};

export default OAuth;
