import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk, RootState } from '../../app/store';

export interface User {
    id?: number,
    firstname: string,
    lastname: string,
    age: number,
    email: string,
    password?: string,
    role: string
}

interface UserState {
    user: User | null,
    isLoggedIn: boolean,
    error: string | undefined
}

const initialState: UserState = {
    user: null,
    isLoggedIn: false,
    error: undefined
}


export const getUserLogin = createAsyncThunk("user/getuserLogin", (obj: {email: string, password: string }) => {
    return axios.post(process.env.REACT_APP_URL_API + 'login/', obj).then( response => {
        if(response.status !== 200) throw Error(response.statusText)
        return response.data
    }).catch(error => {throw Error(error.message)})
})

export const setIsLoggedIn = (isLoggedIn: boolean): PayloadAction<boolean> => ({
    type: "userLogin/setIsLoggedIn",
    payload: isLoggedIn,
  });
  
  export const logout = (): AppThunk => async (dispatch) => {
    localStorage.removeItem("user");
    dispatch(setIsLoggedIn(false));
  };

export const userLogin_slice = createSlice(
    {
        name: 'userLogin',
        initialState: initialState,
        reducers: {
            setIsLoggedIn: (state, action) => {
              state.isLoggedIn = action.payload;
            },
        },
        extraReducers: (builder) => { 
            builder
                  .addCase(getUserLogin.rejected, (state, action) => {
                    state.error = action.error.message
                  })
                  .addCase(getUserLogin.fulfilled, (state, action) => {
                    state.user = action.payload
                    state.isLoggedIn = true
                  })

        }
    }
)

export const selectIsLoggedIn = (state: RootState) => state.userLogin.isLoggedIn;
export const selectError = (state: RootState) => state.userLogin.error;
export const selectUserLogin = (state: RootState) => state.userLogin.user;

const { reducer } = userLogin_slice;
export default reducer