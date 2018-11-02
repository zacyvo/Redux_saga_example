
import { USER_LOGNIED} from './constants';

const  appReducer = (user="", action) => { 
  switch (action.type) {
    case USER_LOGNIED:
      return action.user
    default:
      return user;
  }
}
  
export default appReducer;