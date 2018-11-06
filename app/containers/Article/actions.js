import {
  FETCH_ARTICLE_FAILED,FETCH_ARTICLE,FETCH_ARTICLE_SUCCEEDED,
  FETCH_COMMMENT_FAILED,FETCH_COMMMENT,FETCH_COMMMENT_SUCCEEDED,
  SUBMIT_COMMMENT_FAILED,SUBMIT_COMMMENT,SUBMIT_COMMMENT_SUCCEEDED,
  DEL_COMMMENT_FAILED,DEL_COMMMENT,DEL_COMMMENT_SUCCEEDED,
} 
from './constants'


export const delComment =(articleSlug,commentId)=>{
  return{
    type:DEL_COMMMENT,
    articleSlug,
    commentId
  }
}

export const delCommentSucceeded =(commentId)=>{
  return{
    type:DEL_COMMMENT_SUCCEEDED,
    commentId
  }
}

export const delCommentFailed = (error) =>{
  return{
    type:DEL_COMMMENT_FAILED,
    error
  }
}

export const submitComment =(articleSlug,comment)=>{
  return{
    type:SUBMIT_COMMMENT,
    articleSlug,
    comment
  }
}

export const submitCommentSucceeded =(comment)=>{
  return{
    type:SUBMIT_COMMMENT_SUCCEEDED,
    comment
  }
}

export const submitCommentFailed = (error) =>{
  return{
    type:SUBMIT_COMMMENT_FAILED,
    error
  }
}

export const fetchComment =(articleSlug)=>{
  return{
    type:FETCH_COMMMENT,
    articleSlug
  }
}

export const fetchCommentSucceeded =(recievedComment)=>{
  return{
    type:FETCH_COMMMENT_SUCCEEDED,
    recievedComment
  }
}

export const fetchCommentFailed = (error) =>{
  return{
    type:FETCH_COMMMENT_FAILED,
    error
  }
}


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