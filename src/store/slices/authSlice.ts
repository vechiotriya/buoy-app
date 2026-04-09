import { storage } from "@/src/services/storage";
import { User } from "@/src/types/misc";
import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
}

const initialState:AuthState={
    isAuthenticated: !!storage.getString('accessToken'),
    user:null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        loggedIn:(state,action)=>{
            state.isAuthenticated=true;
            state.user=action.payload.user;            
            storage.set('accessToken', action.payload.accessToken);
        },
        loggedOut:(state)=>{
            state.isAuthenticated=false;
            state.user=null;
            storage.remove('accessToken');
        }
    }
})

export const {loggedIn,loggedOut}=authSlice.actions;
export default authSlice.reducer;
