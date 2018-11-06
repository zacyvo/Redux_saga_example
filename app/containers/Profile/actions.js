import {
  FETCH_PROFILE_FAILED,FETCH_PROFILE,FETCH_PROFILE_SUCCEEDED,
  FETCH_ARTICLES_BY_AUTHOR,FETCH_ARTICLES_BY_AUTHOR_SUCCEEDED,FETCH_ARTICLES_BY_AUTHOR_FAILED,
  FETCH_ARTICLES_FAVORITE_BY_AUTHOR,
  FETCH_ARTICLES_FAVORITE_BY_AUTHOR_SUCCEEDED,
  FETCH_ARTICLES_FAVORITE_BY_AUTHOR_FAILED
} from './constants'


export const fetchArticlesByAuthor =(numberPage,username)=>{
  return{
    type:FETCH_ARTICLES_BY_AUTHOR,
    username,
    numberPage
  }
}

export const fetchArticlesByAuthorSucceeded =(recievedArticles)=>{
  return{
    type:FETCH_ARTICLES_BY_AUTHOR_SUCCEEDED,
    recievedArticles
  }
}

export const fetchArticlesByAuthorFailed = (error) =>{
  return{
    type:FETCH_ARTICLES_BY_AUTHOR_FAILED,
    error
  }
}


export const fetchArticlesFavoriteByAuthor =(numberPage,username)=>{
  return{
    type:FETCH_ARTICLES_FAVORITE_BY_AUTHOR,
    username,
    numberPage
  }
}

export const fetchArticlesFavoriteByAuthorSucceeded =(recievedArticles)=>{
  return{
    type:FETCH_ARTICLES_FAVORITE_BY_AUTHOR_SUCCEEDED,
    recievedArticles
  }
}

export const fetchArticlesFavoriteByAuthorFailed = (error) =>{
  return{
    type:FETCH_ARTICLES_FAVORITE_BY_AUTHOR_FAILED,
    error
  }
}

export const fetchProfile =(username)=>{
  return{
    type:FETCH_PROFILE,
    username
  }
}

export const fetchProfileSucceeded =(recievedProfile)=>{
  return{
    type:FETCH_PROFILE_SUCCEEDED,
    recievedProfile
  }
}

export const fetchProfileFailed = (error) =>{
  return{
    type:FETCH_PROFILE_FAILED,
    error
  }
}