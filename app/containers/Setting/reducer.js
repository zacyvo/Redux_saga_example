import {FETCH_SETTING_FAILED,FETCH_SETTING,FETCH_SETTING_SUCCEEDED,UPDATE_SETTING_SUCCEEDED,UPDATE_SETTING_FAILED} from './constants'
import { fromJS } from 'immutable';

export const initialState = fromJS({
  setting: {},
});

const fetchSetting =(setting={},action)=>{
  switch (action.type){
    case FETCH_SETTING_SUCCEEDED:
      return action.recievedSetting
    case FETCH_SETTING_FAILED:
      return []
    default :
      return setting
  }
} 
export default fetchSetting