import {SIGN_UP,SIGN_UP_FAILED,SIGN_UP_SUCCEEDED} from "./constants"
import { fromJS } from 'immutable';

export const initialState = fromJS({
  user: {},
});
const SigupReducer = (user={},action) =>{
  switch (action.type) {
    case SIGN_UP_SUCCEEDED:
      return action.data
    case SIGN_UP_FAILED:
      return {error: action.error}
    default:
      return user
  }
}
export default SigupReducer