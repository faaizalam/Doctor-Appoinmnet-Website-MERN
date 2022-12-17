import { createSlice } from '@reduxjs/toolkit'

let initialState={
    Userinfo:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):{},
    isLoading:false,
    Apply:{},
    error:"",
    messages:"",
    sucess:false
    
}

   export  const registerReducer=createSlice({
        name:"Register",
        initialState,

      reducers:{
        Registerloading:(state)=>{
             state.isLoading=true
        },
        RegisterSucess:(state,action)=>{
         
             console.log(action.payload)
             state.isLoading=false
             state.Userinfo=action.payload.user
             
             state.messages=action.payload.message
          },
          Registerfaild:(state,action)=>{
               console.log(action.payload)
               state.isLoading=false
               state.error=action.payload
          },
          Registerlogout:(state)=>{
               console.log("bn2n")
          state.Userinfo={}

          }
          
          //      loginloading:(state)=>{
          //           state.isLoading=true
          //      },
          //      loginsucess:(state,action)=>{
          //           state.isLoading=false
          //           state.Userinfo=action.payload.user
          //           state.messages=action.payload.message
     
          //    },
          //    loginfail:(state,action)=>{
          //      state.isLoading=false
          //      state.error=action.payload
          //    },
          //    Userlogout:(state,action)=>{
          //      console.log("bnn")
          //      state.Userinfo={}
          
          // }
          
     
          

        



       
        
      }

    })

    export const loginReducer=createSlice({
     name:"login",
     initialState,
     reducers:{
          loginloading:(state)=>{
               state.isLoading=true
          },
          loginsucess:(state,action)=>{
               state.isLoading=false
               state.Userinfo=action.payload.user
               state.messages=action.payload.message

        },
        loginfail:(state,action)=>{
          state.isLoading=false
          state.error=action.payload
        },

        Userlogout:(state,action)=>{
          console.log("bnn")
          state.Userinfo={}
     
     },
        Userloginerrorreset:(state,action)=>{
          console.log("bnn")
          state.error=""
     
     }
     }
    })


//     .....Apply dr

export const ApplyDrReducer=createSlice({
     name:"Apply",
     initialState,
     reducers:{
          Applyloading:(state)=>{
               state.isLoading=true

          },
          Applysuccs:(state,action)=>{
               state.isLoading=false
               state.sucess=true
               state.Apply=action.payload

          },
          Applyfaild:(state,action)=>{
               state.isLoading=false
               state.error=action.payload

          }
     }

})



// .....Markseen
export const MarkseenReducer=createSlice({
     name:"Markseen",
     initialState,
     reducers:{
          Markloading:(state)=>{
               state.isLoading=true

          },
          MarkSucess:(state,action)=>{
               state.isLoading=false
               state.sucess=true

               // state.Apply=action.payload

          },
          MarkFaild:(state,action)=>{
               state.isLoading=false
               state.error=action.payload

          },
          ResetNotifee:(state,action)=>{
               state.isLoading=false
               state.sucess=false

          }
     }

})



export const DeleteNotiReducer=createSlice({
     name:"DeleteNoti",
     initialState,
     reducers:{
          Deleteloading:(state)=>{
               state.isLoading=true

          },
          DeleteSucss:(state,action)=>{
               state.isLoading=false
               state.sucess=true
               // state.Apply=action.payload

          },
          Deletefail:(state,action)=>{
               state.isLoading=false
               state.error=action.payload

          }


     }
})


export const Register=registerReducer.actions
export const login=loginReducer.actions
export const Applydr=ApplyDrReducer.actions
export const MarkAction=MarkseenReducer.actions
export const DeleteAction=DeleteNotiReducer.actions
