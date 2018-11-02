import React from 'react';
import agent from "../agent"
import {activeHeader} from "../Header/actions"
import { Link } from 'react-router-dom';
import {connect} from "react-redux"
class LoginPage extends React.Component {
  state={
    account:{},
    messagesError:"",
    loadingSubmit:false,
  }
  async handleSubmit(event){
    this.setState({loadingSubmit:true})
    const {account} = this.state
    event.preventDefault()
    let data = {}
    try{
      data = await agent.Auth.login(account.email,account.password)
      window.localStorage.setItem('jwt',data.user.token);
      agent.setToken(data.user.token)
      window.location.href="/"
    }catch(error){
      this.setState({messagesError:"email or password is invalid",loadingSubmit:false})
    }
    
  }
  render() {
    const {account,messagesError,loadingSubmit} = this.state
    return (
      <div>
        <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link onClick={()=>this.props.onHandleClickLink("SIGN_UP")} to={"/signup"}>Need an account?</Link>
              </p>
              {messagesError?
              <ul className="error-messages">
                <li>{messagesError}</li>
              </ul>:""}
              <form  onSubmit={this.handleSubmit.bind(this)}>
                <fieldset className="form-group">
                  <input disabled={loadingSubmit} required onChange={(e)=>{account.email = e.target.value; this.setState({account})}} className="form-control form-control-lg" type="email" placeholder="Email"/>
                </fieldset>
                <fieldset className="form-group">
                  <input disabled={loadingSubmit} required onChange={(e)=>{account.password = e.target.value; this.setState({account})}} className="form-control form-control-lg" type="password" placeholder="Password"/>
                </fieldset>
                <button disabled={loadingSubmit} className="btn btn-lg btn-primary pull-xs-right">
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
const mapsDispatchToProps = (dispatch) =>{
  return{
    onHandleClickLink: (activeName) =>{
      dispatch(activeHeader(activeName))
    },
  }
}
export default connect(mapsDispatchToProps)(LoginPage)
