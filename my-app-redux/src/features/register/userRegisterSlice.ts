import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from '../../app/store';



export interface RegisterUser {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string | null,
    role: string
  }
  
interface RegisterState {
  register: RegisterUser | null,
  isLoggedIn: boolean,
  error: string | undefined
}

const initialState: RegisterState = {
    register: null,
    isLoggedIn: false,
    error: undefined
};


//AZIONE

export const saveUser = createAsyncThunk("user/userRegister",(obj:RegisterUser) => {
  return axios.post('api/users/register', obj).then( response => {
    if(response.status !== 200) throw Error(response.statusText)
    return console.log(response.data)
}).catch(error => {throw Error(error.message)})
})
  
export const setIsLoggedIn = (isLoggedIn: boolean): PayloadAction<boolean> => ({
  type: "userLogin/setIsLoggedIn",
  payload: isLoggedIn,
});


//SLICE

  const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
      setIsLoggedIn: (state, action) => {
        state.isLoggedIn = action.payload;
      },
  },
    extraReducers: (builder) => { 
      builder
            .addCase(saveUser.rejected, (state, action) => {
              state.error = action.error.message
            })
            .addCase(saveUser.fulfilled, (state, action) => {
              console.log(action.payload)
              state.isLoggedIn = true
            })
          }
  });
  

  export const selectIsLoggedIn = (state: RootState) => state.userLogin.isLoggedIn;
  export const selectError = (state: RootState) => state.userLogin.error;
  export const selectUserLogin = (state: RootState) => state.userLogin.user;

  const { reducer } = registerSlice;
export default reducer