import { 
  FETCH_ARTICLES,FETCH_FAILED,FETCH_SUCCEEDED,FETCH_ARTICLES_BY_AUTHOR,FETCH_ARTICLES_BY_AUTHOR_SUCCEEDED,
  FETCH_UPDATE_ARTICLE,FETCH_UPDATE_ARTICLE_SUCCEEDED,FETCH_UPDATE_ARTICLE_FAILED
} from './constants';

export const fetchArticles = (pageNumber=1,tag="") =>{
  return {
    type: FETCH_ARTICLES,
    pageNumber,
    tag
  };
}

export const fetchUpdateArticles = (slug) =>{
  return {
      type: FETCH_UPDATE_ARTICLE,
      slug
    };
}
export const fetchUpdateArticlesSucceeeded = (receivedArticle) =>{
  return {
    type: FETCH_UPDATE_ARTICLE_SUCCEEDED,
    receivedArticle,
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