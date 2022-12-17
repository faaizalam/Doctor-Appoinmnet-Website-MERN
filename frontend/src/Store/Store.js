
import { configureStore } from "@reduxjs/toolkit";
import { ApplyDrReducer, DeleteNotiReducer, loginReducer, MarkseenReducer, registerReducer } from "./Reducer";






const Store=configureStore({
   
    reducer:{
        Userinfomain:registerReducer.reducer,
        UserLogin:loginReducer.reducer,
        ApplyStore:ApplyDrReducer.reducer,
        Mark:MarkseenReducer.reducer,
        DeleteNoti:DeleteNotiReducer.reducer
    }

})
export default Store

    

