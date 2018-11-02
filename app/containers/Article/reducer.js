import {FETCH_ARTICLE_FAILED,FETCH_ARTICLE,FETCH_ARTICLE_SUCCEEDED} from './constants'
import { fromJS } from 'immutable';

export const initialState = fromJS({
  artile: {},
});

const fetchArticle =(article={},action)=>{
  switch (action.type){
    case FETCH_ARTICLE_SUCCEEDED:
      return action.recievedArticle
    case FETCH_ARTICLE_FAILED:
      return []
    default :
      return article
  }
} 
export default fetchArticle