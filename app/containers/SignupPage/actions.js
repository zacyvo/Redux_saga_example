import {SIGN_UP,SIGN_UP_FAILED,SIGN_UP_SUCCEEDED} from "./constants"

export const submitSignup = (user) =>{
  return{
    type:SIGN_UP,
    user
  }
}

export const submitSignupSucceeded = () =>{
  return{
    type:SIGN_UP_SUCCEEDED
  }
}


export const submitSignupFailed= (error) =>{
  return{
    type:SIGN_UP_FAILED,
    error
  }
}