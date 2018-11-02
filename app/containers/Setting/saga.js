import {FETCH_SETTING_FAILED,FETCH_SETTING,FETCH_SETTING_SUCCEEDED,UPDATE_SETTING,UPDATE_SETTING_SUCCEEDED,UPDATE_SETTING_FAILED} from './constants'
import {takeLatest,put,all} from "redux-saga/effects"
import agent from "../agent"


function* fetchSetting (){
  try{
    const recievedSetting = yield agent.Auth.current()
    yield put({type:FETCH_SETTING_SUCCEEDED,recievedSetting})
  }catch{
    yield put({type:FETCH_SETTING_FAILED,error})
  }
}

function* watchfetchSetting (){
  yield takeLatest(FETCH_SETTING,fetchSetting)
}

function* updateSetting (action){
  try{
    yield agent.Auth.save(action.user)
    yield put({type:UPDATE_SETTING_SUCCEEDED})
  }catch{
    yield put({type:UPDATE_SETTING_FAILED,error})
  }
}

function* watchUpdateSetting (){
  yield takeLatest(UPDATE_SETTING,updateSetting)
}

export default function* watchingReducer (){
  return(
    yield all([
      watchfetchSetting(),
      watchUpdateSetting()
    ])
  )
}