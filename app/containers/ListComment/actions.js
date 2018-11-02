import {FETCH_COMMMENT_FAILED,FETCH_COMMMENT,FETCH_COMMMENT_SUCCEEDED} from './constants'

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