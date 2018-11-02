
import { FETCH_TAGS,FETCH_SUCCEEDED,FETCH_FAILED} from './constants';

const  TagsReducer = (tags=[], action) => { 
  switch (action.type) {
    case FETCH_SUCCEEDED:
      return action.receivedTags;
      case FETCH_FAILED:
      return []
    default:
      return tags;
  }
}
   
export default TagsReducer;

