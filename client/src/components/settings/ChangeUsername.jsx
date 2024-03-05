import React, { useEffect, useState } from "react";
import { TextInput, Button,Spinner, Alert } from "flowbite-react";
import { useSelector,useDispatch } from "react-redux";
import { updateUserFailure,updateUserStart,updateUserSuccess } from "../../redux/user/userSlice";
import {useNavigate} from 'react-router-dom'



const ChangeUsername = () => {
  const { currentUser,error,loading } = useSelector((state) => state.user);
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()

  async function updateUsername(){
    dispatch(updateUserStart())
    const regex = /^[a-zA-Z0-9_]+$/; 
    if (!regex.test(form.username)) {

return dispatch(updateUserFailure('Username can only contain letters, numbers, and no spaces'))
    }
    let username = form.username


    try{
      const newForm = { ...form, username: username.toLowerCase() };
      const res = await fetch('/api/user/updateusername',{
        method:"POST",
        headers:{
          'Content-type': 'application/json'
        },
        body:JSON.stringify(newForm)
      })

      const data = await res.json()

      if(!res.ok){

        return dispatch(updateUserFailure(data.message))
      }

      console.log(data.username)
dispatch(updateUserSuccess({...currentUser, username:data.username}))
navigate(`/${data.username}`)

      

    }
    catch(e){
      return dispatch(updateUserFailure(e.message))

    }
  }

  useEffect(() => {
    setForm({ ...form, username: currentUser.username });
  }, [currentUser]);
  return (
    <div className="flex flex-col gap-4">
      <h2>Change Username</h2>
      <div className="flex flex-col gap-3">
        <TextInput
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          value={form.username}
        />
        <TextInput
        type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          value={form.password}
          placeholder="Password"
        />
      </div>
      <Button onClick={updateUsername}
        disabled={(currentUser.username === form.username || !form.password ||loading)}
        gradientDuoTone={"purpleToPink"}
        className="self-end"
      >
        {loading ? <Spinner />: 'Update Username'}
        
      </Button>
      {error && <Alert color={'failure'}>{error}</Alert>}
    </div>
  );
};

export default ChangeUsername;
