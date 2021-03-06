import {
  FETCH_SUCCEEDED,FETCH_FAILED,FETCH_ARTICLES,FETCH_ARTICLES_BY_AUTHOR,FETCH_ARTICLES_BY_AUTHOR_SUCCEEDED,
  FETCH_UPDATE_ARTICLE,FETCH_UPDATE_ARTICLE_SUCCEEDED,FETCH_UPDATE_ARTICLE_FAILED
} from './constants';
import {takeLatest,put,all,takeEvery} from "redux-saga/effects"
import agent from "../agent"

function* fetchArticles(action){
  try {
    const receivedArticles = yield agent.Articles.byTag(action.tag,action.pageNumber-1)
    yield put({type:FETCH_SUCCEEDED,receivedArticles:receivedArticles})
  } catch (error) {
    yield put({type:FETCH_FAILED,error})
  }
}

function* fetchArticlesByAuthor(action){
  try {
    const receivedArticles = yield agent.Articles.byAuthor(action.username,action.pageNumber-1)
    yield put({type:FETCH_ARTICLES_BY_AUTHOR_SUCCEEDED,receivedArticles:receivedArticles})
  } catch (error) {
    yield put({type:FETCH_FAILED,error})
  }
}

function* updateArticle(action){
  try {
    const receivedArticle = yield agent.Articles.favorite(action.slug)
    yield put({type:FETCH_UPDATE_ARTICLE_SUCCEEDED,receivedArticle})
  } catch (error) {
    yield put({type:FETCH_UPDATE_ARTICLE_FAILED,error})
  }
}

function* watchFetchArticlesByAuthor (){
  yield takeLatest(FETCH_ARTICLES_BY_AUTHOR,fetchArticlesByAuthor)
}

function* watchFetchArticles (){
  yield takeLatest(FETCH_ARTICLES,fetchArticles)
}

function* watchUpdateArticle (){
  yield takeLatest(FETCH_UPDATE_ARTICLE,updateArticle)
}



export default function* rootSaga (){
  yield all([
    watchFetchArticles(),
    watchFetchArticlesByAuthor(),
    watchUpdateArticle()
  ])
}