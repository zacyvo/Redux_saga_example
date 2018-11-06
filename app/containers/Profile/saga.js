import {
  FETCH_PROFILE_SUCCEEDED,FETCH_PROFILE,FETCH_PROFILE_FAILED,
  FETCH_ARTICLES_BY_AUTHOR_SUCCEEDED,
  FETCH_ARTICLES_BY_AUTHOR,
  FETCH_ARTICLES_BY_AUTHOR_FAILED,
  FETCH_ARTICLES_FAVORITE_BY_AUTHOR,
  FETCH_ARTICLES_FAVORITE_BY_AUTHOR_SUCCEEDED,
  FETCH_ARTICLES_FAVORITE_BY_AUTHOR_FAILED
} from './constants'
import {takeLatest,takeEvery,put,all} from "redux-saga/effects"
import agent from "../agent"


function* fetchProfile (action){
  try{
    const recievedProfile = yield agent.Profile.get(action.username)
    yield put({type:FETCH_PROFILE_SUCCEEDED,recievedProfile})
  }catch{
    yield put({type:FETCH_PROFILE_FAILED,error})
  }
}

function* fetchArticlesByAuthor(action){
  try {
    const receivedArticles = yield agent.Articles.byAuthor(action.username,action.pageNumber-1)
    yield put({type:FETCH_ARTICLES_BY_AUTHOR_SUCCEEDED,receivedArticles:receivedArticles})
  } catch (error) {
    yield put({type:FETCH_ARTICLES_BY_AUTHOR_FAILED,error})
  }
}

function* fetchArticlesFavoriteByAuthor(action){
  try {
    const receivedArticles = yield agent.Articles.favoritedBy(action.username,action.pageNumber-1)
    yield put({type:FETCH_ARTICLES_FAVORITE_BY_AUTHOR_SUCCEEDED,receivedArticles})
  } catch (error) {
    yield put({type:FETCH_ARTICLES_FAVORITE_BY_AUTHOR_FAILED,error})
  }
}

function* watchFetchArticlesFavoriteByAuthor (){
  yield takeLatest(FETCH_ARTICLES_FAVORITE_BY_AUTHOR,fetchArticlesFavoriteByAuthor)
}

function* watchFetchArticlesByAuthor (){
  yield takeLatest(FETCH_ARTICLES_BY_AUTHOR,fetchArticlesByAuthor)
}


function* watchFetchProfile (){
  yield takeEvery(FETCH_PROFILE,fetchProfile)
}

export default function* rootSaga (){
  yield all([
    watchFetchProfile(),
    watchFetchArticlesByAuthor(),
    watchFetchArticlesFavoriteByAuthor()
  ])
}