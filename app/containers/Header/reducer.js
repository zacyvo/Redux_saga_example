
import { ACTIVE_HEADER} from './constants';

const  headerReducer = (activeName = "", action) => { 
  switch (action.type) {
    case ACTIVE_HEADER:
      return {activeName: action.activeName};
    default:
      return activeName;
  }
}
  
export default headerReducer;