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
        },
        signoutSuccess : (state) => {
            state.currentUser = null,
            state.error = null,
            state.loading = null
        },
        updateUserStart : (state) =>{
            state.loading =true,
            state.error = null

        },
        updateUserSuccess : (state,action) => {
            state.currentUser = action.payload
            state.error = null,
            state.loading = null
        },
        updateUserFailure : (state,action) => {

            state.error = action.payload,
            state.loading = null
        },



    }
})


export const {signUpFailure,signUpSuccess,signUpStart,signupCreated,signoutSuccess,updateUserFailure,updateUserStart,updateUserSuccess} = userSlice.actions

export default userSlice.reducer