import {FETCH_COMMMENT_FAILED,FETCH_COMMMENT,FETCH_COMMMENT_SUCCEEDED} from './constants'
import { fromJS } from 'immutable';

export const initialState = fromJS({
  comments: [],
});

const fetchComment =(comments=[],action)=>{
  switch (action.type){
    case FETCH_COMMMENT_SUCCEEDED:
      return action.recievedComment
    case FETCH_COMMMENT_FAILED:
      return []
    default :
      return comments
  }
} 
export default fetchComment