import { createSlice } from "@reduxjs/toolkit"

const State={
    LoggedIn:false,
    Name:"Guest",
    Role:"",
    Email:""
}

const userslice=createSlice({
    name:"userslice",
    initialState:State,
    reducers:{
        login(state,action)
        {
            state.LoggedIn=true
            state.Name=action.payload.name
            state.Role=action.payload.role
            state.Email=action.payload.Email
        },
        Logout(state){
            state.LoggedIn=false
            state.Name="Guest"
            state.Role=""
            state.Email=""
        }
    }
})

export const {login,Logout}=userslice.actions
export default userslice.reducer