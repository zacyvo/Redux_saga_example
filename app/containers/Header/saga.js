import { ACTIVE_HEADER } from './constants'
import {put, takeEvery} from "redux-saga/effects"

const activeHeader = () => {
  /* this.props.history.push("/login")*/
  /* console.log("here","Running Saga");  */
}

export default function* watchActiveHeader (){
  yield takeEvery(ACTIVE_HEADER,activeHeader)
}