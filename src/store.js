import { configureStore } from "@reduxjs/toolkit";
import userslice from "./reducer/userslice"
 const Mystore=configureStore({
    reducer:{
        userslice:userslice
    }
 })
 export default Mystore