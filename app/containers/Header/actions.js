import { ACTIVE_HEADER } from './constants';


export const activeHeader = (activeName) =>{
  return {
    type: ACTIVE_HEADER,
    activeName,
  };
}