import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    theme: 'dark',
}


const themeReducer = createSlice({
    name:'theme',
    initialState,
    reducers:{
        changeTheme: (state) =>{
            state.theme = state.theme === 'light' ? 'dark' : 'light'
        }
    }

})


export const {changeTheme} = themeReducer.actions

export default themeReducer.reducer