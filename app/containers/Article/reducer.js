import {
  FETCH_ARTICLE_FAILED,FETCH_ARTICLE,FETCH_ARTICLE_SUCCEEDED,
  FETCH_COMMMENT_FAILED,FETCH_COMMMENT,FETCH_COMMMENT_SUCCEEDED,
  SUBMIT_COMMMENT_FAILED,SUBMIT_COMMMENT,SUBMIT_COMMMENT_SUCCEEDED,
  DEL_COMMMENT_FAILED,DEL_COMMMENT,DEL_COMMMENT_SUCCEEDED,}  
from './constants'
import _ from "lodash"
const fetchArticle =(data={article: {},comments: []},action)=>{
  switch (action.type){
    case FETCH_ARTICLE_SUCCEEDED:
      return {
        ...data,
        article:action.recievedArticle
      }
    case FETCH_COMMMENT_SUCCEEDED:
      return { 
        ...data,
        comments:action.recievedComment
      }
    case DEL_COMMMENT_SUCCEEDED:
      let commentId = action.commentId
      let arrComments = data.comments.comments
      let index = _.findIndex(arrComments,{"id":commentId})
      if(index!==-1){
        arrComments.splice(index,1)
      }
      let commentsNew = {comments:arrComments}
      return { 
        ...data,
        comments:commentsNew
      }
    case SUBMIT_COMMMENT_SUCCEEDED:
      let comment = action.comment.comment
      let newComments = data.comments.comments
      newComments.unshift(comment)
      let comments = {comments:newComments}
      return {
        ...data,
        comments:comments
      }
    case FETCH_ARTICLE_FAILED:
      return []
    default :
      return data
  }
} 
export default fetchArticle