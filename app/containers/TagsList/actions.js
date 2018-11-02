import { FETCH_TAGS,FETCH_FAILED,FETCH_SUCCEEDED } from './constants';


export const fetchTags = () =>{
  return {
    type: FETCH_TAGS
  };
}
export const fetchTagsSucceeeded = (receivedTags) =>{
  return {
    type: FETCH_SUCCEEDED,
    receivedTags,
  };
}
export const fetchTagsFailed = (error) =>{
  return {
    type: FETCH_FAILED,
    error, 
  };
}