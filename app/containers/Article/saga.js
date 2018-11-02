import {FETCH_ARTICLE_SUCCEEDED,FETCH_ARTICLE,FETCH_ARTICLE_FAILED} from './constants'
import {takeLatest,put,all} from "redux-saga/effects"
import agent from "../agent"
import watchFetchComment from "../ListComment/saga"

function* fetchArticle (action){
  try{
    const recievedArticle = yield agent.Articles.get(action.articleSlug)
    yield put({type:FETCH_ARTICLE_SUCCEEDED,recievedArticle})
  }catch{
    yield put({type:FETCH_ARTICLE_FAILED,error})
  }
}

function* watchFetchArticle (){
  yield takeLatest(FETCH_ARTICLE,fetchArticle)
}
export default function* rootSaga (){
  yield all([
    watchFetchArticle()
  ])
}