import {FETCH_PROFILE_FAILED,FETCH_PROFILE,FETCH_PROFILE_SUCCEEDED,FETCH_ARTICLES_BY_AUTHOR,FETCH_ARTICLES_BY_AUTHOR_SUCCEEDED} from './constants'


export const fetchArticlesByAuthor =(numberPage,username)=>{
  return{
    type:FETCH_ARTICLES_BY_AUTHOR,
    username,
    numberPage
  }
}

export const fetchArticlesByAuthorSucceeded =(recievedArticle)=>{
  return{
    type:FETCH_ARTICLES_BY_AUTHOR_SUCCEEDED,
    recievedArticle
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