
import {FETCH_SUCCEEDED,FETCH_FAILED,FETCH_ARTICLES,FETCH_ARTICLES_BY_AUTHOR_SUCCEEDED,
  FETCH_UPDATE_ARTICLE,FETCH_UPDATE_ARTICLE_SUCCEEDED,FETCH_UPDATE_ARTICLE_FAILED
} from './constants';
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
    case FETCH_UPDATE_ARTICLE_SUCCEEDED:
      let newitem = action.receivedArticle.article
      let arr = {articles:[],articlesCount:artiles.articlesCount};
      artiles.articles.map((item,index)=>{ 
        if(item.slug === newitem.slug){
          item = newitem
        }
        arr.articles.push(item)
      })
      return(arr)
    case FETCH_FAILED:
      return []
    default: 
      return artiles;
  } 
}
  
export default articleRecuders;