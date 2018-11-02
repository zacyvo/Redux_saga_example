import {SIGN_UP,SIGN_UP_FAILED,SIGN_UP_SUCCEEDED} from "./constants"
import {takeLatest,put,all} from "redux-saga/effects"
import agent from "../agent"

function* submitSginup(action){
  try{
    let data =  yield agent.Auth.register(action.user.username,action.user.email,action.user.password)
    yield put({type:SIGN_UP_SUCCEEDED,data})
  }catch(error){
    let message  = error.response.body.errors
    yield put({type:SIGN_UP_FAILED,error:message})
  }
}

export default function* watchSubmitSignup (){
  yield takeLatest(SIGN_UP,submitSginup)
}