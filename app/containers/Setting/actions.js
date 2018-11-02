import {FETCH_SETTING_FAILED,FETCH_SETTING,FETCH_SETTING_SUCCEEDED,UPDATE_SETTING_SUCCEEDED,UPDATE_SETTING_FAILED,UPDATE_SETTING} from './constants'

export const fetchSetting =()=>{
  return{
    type:FETCH_SETTING,
  }
}
export const fetchSettingSucceeded =(recievedSetting)=>{
  return{
    type:FETCH_SETTING_SUCCEEDED,
    recievedSetting
  }
}

export const fetchSettingFailed = (error) =>{
  return{
    type:FETCH_SETTING_FAILED,
    error
  }
}

export const updateSetting =(user)=>{
  return{
    type:UPDATE_SETTING,
    user
  }
}
export const updateSettingSucceeded = () =>{
  return {
    type : UPDATE_SETTING_SUCCEEDED
  }
}
export const updateSettingFailed = (error) =>{
  return {
    type : UPDATE_SETTING_FAILED,
    error
  }
}