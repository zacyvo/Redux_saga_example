import {FETCH_COMMMENT_FAILED,FETCH_COMMMENT,FETCH_COMMMENT_SUCCEEDED} from './constants'
import {takeLatest,put} from "redux-saga/effects"
import agent from "../agent"


function* fetchComment (action){
  
  try{
    const recievedComment = yield agent.Comments.forArticle(action.articleSlug)
    yield put({type:FETCH_COMMMENT_SUCCEEDED,recievedComment})
  }catch{
    yield put({type:FETCH_COMMMENT_FAILED,error})
  }
}

export default function* watchFetchComment (){
  yield takeLatest(FETCH_COMMMENT,fetchComment)
}

