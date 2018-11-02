
import {FETCH_SUCCEEDED,FETCH_FAILED,FETCH_ARTICLES,FETCH_ARTICLES_BY_AUTHOR_SUCCEEDED} from './constants';
import { fromJS } from 'immutable';

export const initialState = fromJS({
  artiles: [],
});

const  articleRecuders = (artiles=[], action) => { 
  switch (action.type) {
    case FETCH_SUCCEEDED:
      return action.receivedArticles
    case FETCH_ARTICLES_BY_AUTHOR_SUCCEEDED:
      return action.receivedArticles
    case FETCH_FAILED:
      return []
    default: 
      return artiles;
  } 
}
  
export default articleRecuders;