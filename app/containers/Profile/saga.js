import {FETCH_PROFILE_SUCCEEDED,FETCH_PROFILE,FETCH_PROFILE_FAILED} from './constants'
import {takeLatest,put} from "redux-saga/effects"
import agent from "../agent"


function* fetchProfile (action){
  try{
    const recievedProfile = yield agent.Profile.get(action.username)
    yield put({type:FETCH_PROFILE_SUCCEEDED,recievedProfile})
  }catch{
    yield put({type:FETCH_PROFILE_FAILED,error})
  }
}

export default function* watchFetchProfile (){
  yield takeLatest(FETCH_PROFILE,fetchProfile)
}