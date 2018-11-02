import {FETCH_PROFILE_FAILED,FETCH_PROFILE,FETCH_PROFILE_SUCCEEDED} from './constants'
import { fromJS } from 'immutable';

export const initialState = fromJS({
  profile: {},
});

const fetchProfile =(profile={},action)=>{
  switch (action.type){
    case FETCH_PROFILE_SUCCEEDED:
      return action.recievedProfile
    case FETCH_PROFILE_FAILED:
      return []
    default :
      return profile
  }
} 
export default fetchProfile