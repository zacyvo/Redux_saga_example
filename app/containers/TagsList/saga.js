import {FETCH_TAGS,FETCH_SUCCEEDED,FETCH_FAILED } from './constants'
import {takeLatest,put} from "redux-saga/effects"
import agent from "../agent"

function* fetchTags (){
  try {
    const receivedTags = yield agent.Tags.getAll()    
    yield put({type:FETCH_SUCCEEDED,receivedTags:receivedTags})
  } catch (error) {
    yield put({type:FETCH_FAILED,error})
  }
}

export default function* watchFetchTags (){
  yield takeLatest(FETCH_TAGS,fetchTags)
}