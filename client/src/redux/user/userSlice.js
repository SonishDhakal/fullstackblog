import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    currentUser:null,
    error:null,
    loading:false
};


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signUpStart: (state) =>{
            state.loading =true,
            state.error = null
        },
        signUpSuccess: (state,action) =>{
            state.loading = false
            state.error = null
            state.currentUser = action.payload

        },
        signUpFailure: (state,action) => {
            state.loading =false,
            state.error = action.payload
        },
        signupCreated: (state) =>{
            state.loading = false,
            state.error = false
        }



    }
})


export const {signUpFailure,signUpSuccess,signUpStart,signupCreated} = userSlice.actions

export default userSlice.reducer