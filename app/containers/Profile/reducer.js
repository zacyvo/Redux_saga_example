import {
  FETCH_PROFILE_SUCCEEDED,FETCH_PROFILE,FETCH_PROFILE_FAILED,
  FETCH_ARTICLES_BY_AUTHOR_SUCCEEDED,
  FETCH_ARTICLES_BY_AUTHOR,
  FETCH_ARTICLES_BY_AUTHOR_FAILED,
  FETCH_ARTICLES_FAVORITE_BY_AUTHOR,
  FETCH_ARTICLES_FAVORITE_BY_AUTHOR_SUCCEEDED,
  FETCH_ARTICLES_FAVORITE_BY_AUTHOR_FAILED
} from './constants'

const fetchProfile =(data={profile:{},articles:[]},action)=>{
  switch (action.type){
    case FETCH_PROFILE_SUCCEEDED:
      return {
        ...data,
        error:"",
        profile:action.recievedProfile
      }
    case FETCH_ARTICLES_BY_AUTHOR_SUCCEEDED:
      return {
        ...data,
        error:"",
        articles:action.receivedArticles
      }
    case FETCH_ARTICLES_BY_AUTHOR_FAILED:
      return {
        ...data,        
        articles:[],
        error:action.error
      }
      case FETCH_ARTICLES_FAVORITE_BY_AUTHOR_SUCCEEDED:
      return {
        ...data,
        error:"",
        articles:action.receivedArticles
      }
    case FETCH_ARTICLES_FAVORITE_BY_AUTHOR_FAILED:
      return {
        ...data,        
        articles:[],
        error:action.error
      }
    case FETCH_PROFILE_FAILED:
      return {
        ...data,
        profile:{},
        error:action.error
      }
    default :
      return data
  }
} 
export default fetchProfile