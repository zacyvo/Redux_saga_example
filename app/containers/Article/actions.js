import {FETCH_ARTICLE_FAILED,FETCH_ARTICLE,FETCH_ARTICLE_SUCCEEDED} from './constants'

export const fetchArticle =(articleSlug)=>{
  return{
    type:FETCH_ARTICLE,
    articleSlug
  }
}

export const fetchArticleSucceeded =(recievedArticle)=>{
  return{
    type:FETCH_ARTICLE_SUCCEEDED,
    recievedArticle
  }
}

export const fetchArticleFailed = (error) =>{
  return{
    type:FETCH_ARTICLE_FAILED,
    error
  }
}