import {
  FETCH_ARTICLE_FAILED,FETCH_ARTICLE,FETCH_ARTICLE_SUCCEEDED,
  FETCH_COMMMENT_FAILED,FETCH_COMMMENT,FETCH_COMMMENT_SUCCEEDED,
  SUBMIT_COMMMENT_FAILED,SUBMIT_COMMMENT,SUBMIT_COMMMENT_SUCCEEDED,
  DEL_COMMMENT_FAILED,DEL_COMMMENT,DEL_COMMMENT_SUCCEEDED,} 
from './constants'
import {takeLatest,put,all} from "redux-saga/effects"
import agent from "../agent"

function* delComment (action){
  try{
    yield agent.Comments.delete(action.articleSlug,action.commentId)
    yield put({type:DEL_COMMMENT_SUCCEEDED,commentId:action.commentId})
  }catch(error){
    yield put({type:DEL_COMMMENT_FAILED,error})
  }
}

function* watchDelComment (){
  yield takeLatest(DEL_COMMMENT,delComment)
}

function* fetchArticle (action){
  try{
    const recievedArticle = yield agent.Articles.get(action.articleSlug)
    yield put({type:FETCH_ARTICLE_SUCCEEDED,recievedArticle})
  }catch(error){
    yield put({type:FETCH_ARTICLE_FAILED,error})
  }
}

function* watchFetchArticle (){
  yield takeLatest(FETCH_ARTICLE,fetchArticle)
}

function* submitComment (action){
  try{
    const comment = yield agent.Comments.create(action.articleSlug,action.comment)
    yield put({type:SUBMIT_COMMMENT_SUCCEEDED,comment})
  }catch(error){
    yield put({type:SUBMIT_COMMMENT_FAILED,error})
  }
}

function* watchSubmitComment (){
  yield takeLatest(SUBMIT_COMMMENT,submitComment)
}

function* fetchComment (action){
  
  try{
    const recievedComment = yield agent.Comments.forArticle(action.articleSlug)
    yield put({type:FETCH_COMMMENT_SUCCEEDED,recievedComment})
  }catch(error){
    yield put({type:FETCH_COMMMENT_FAILED,error})
  }
}

function* watchFetchComment (){
  yield takeLatest(FETCH_COMMMENT,fetchComment)
}

export default function* rootSaga (){
  yield all([
    watchFetchArticle(),
    watchFetchComment(),
    watchSubmitComment(),
    watchDelComment()
  ])
}