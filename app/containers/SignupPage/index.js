import React from 'react';
import reducer from "./reducer"
import saga from "./saga"
import {submitSignup} from "./actions"
import {activeHeader} from "../Header/actions"
import {connect} from "react-redux"
import {compose} from "redux"
import injectSaga from "../../utils/injectSaga"
import injectReducer from "../../utils/injectReducer"
import { Link } from 'react-router-dom';
class SignupPage extends React.Component {
  state={
    account:{},
    messagesError:""
  }
  handleSubmit(event){
    const {account} = this.state
    event.preventDefault()
    this.props.onSubmitSignup(account)
  }
  render() {
    const {account} = this.state
    const {data} = this.props
    let messagesError = []
    if(data&&Object.getOwnPropertyNames(data).length > 0){
      let messages = Object.values(data)[0]
      let messagesValue = Object.values(messages)
      messagesValue.forEach((item,index)=>{
        let err = {
          name: Object.keys(messages)[index],
          value:item
        }
        messagesError.push(err)
      })
    }    
    return (
      <div>
        <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <Link onClick={()=>this.props.onHandleClickLink("SIGN_IN")} to={"/login"}>Have an account?</Link>
              </p>
              {messagesError?
              messagesError.map((item,index)=>{
              return(
              <ul key={index} className="error-messages">
                <li>{item.name} {item.value}</li>
              </ul>
               )
             })
              :""}
              <form onSubmit={this.handleSubmit.bind(this)}>
                <fieldset className="form-group">
                  <input required onChange={(e)=>{account.username = e.target.value; this.setState({account})}} className="form-control form-control-lg" type="text" placeholder="Your Name"/>
                </fieldset>
                <fieldset className="form-group">
                  <input required onChange={(e)=>{account.email = e.target.value; this.setState({account})}} className="form-control form-control-lg" type="text" placeholder="Email"/>
                </fieldset>
                <fieldset className="form-group">
                  <input required onChange={(e)=>{account.password = e.target.value; this.setState({account})}} className="form-control form-control-lg" type="password" placeholder="Password"/>
                </fieldset>
                <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                  Sign up
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
      </div>
      
    );
  }
}
const mapsStateToProps = (state) =>{  
  return {
    data : state.get("SignupReducer")?state.get("SignupReducer"):""
  }
}
const mapsDispatchToProps = (dispatch) =>{
  return{
    onSubmitSignup:(user)=>{
      dispatch(submitSignup(user))
    },
    onHandleClickLink: (activeName) =>{
      dispatch(activeHeader(activeName))
    },
  }
  
}
const withConect = connect(
  mapsStateToProps,
  mapsDispatchToProps
)
const withReducer = injectReducer({key:"SignupReducer",reducer})
const withSaga =  injectSaga ({key:"SignupReducer",saga})
export default compose(
  withConect,
  withReducer,
  withSaga
)
(SignupPage)