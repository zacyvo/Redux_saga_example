import { FETCH_ARTICLES,FETCH_FAILED,FETCH_SUCCEEDED,FETCH_ARTICLES_BY_AUTHOR,FETCH_ARTICLES_BY_AUTHOR_SUCCEEDED } from './constants';


export const fetchArticles = (pageNumber=1,tag="") =>{
  return {
    type: FETCH_ARTICLES,
    pageNumber,
    tag
  };
}
export const fetchArticlesByAuthor = (pageNumber=1,username="") =>{
  return {
    type: FETCH_ARTICLES_BY_AUTHOR,
    pageNumber,
    username
  };
}
export const fetchArticleSucceeeded = (receivedArticles) =>{
  return {
    type: FETCH_SUCCEEDED,
    receivedArticles,
  };
}
export const fetchArticleByAuthorSucceeeded = (receivedArticles) =>{
  return {
    type: FETCH_ARTICLES_BY_AUTHOR_SUCCEEDED,
    receivedArticles,
  };
}
export const fetchArticleFailed = (error) =>{
  return {
    type: FETCH_FAILED,
    error, 
  };
}