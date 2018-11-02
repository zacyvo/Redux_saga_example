import { USER_LOGNIED } from './constants';


export function userLogined(user) {
  return {
    type: USER_LOGNIED,
    user,
  };
}