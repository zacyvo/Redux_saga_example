import React from "react"
import saga from "./saga"
import reducer from "./reducer"
import {connect} from "react-redux"
import {compose} from "redux"
import injectSaga from "../../utils/injectSaga"
import injectReducer from "../../utils/injectReducer"
import {fetchSetting,updateSetting} from "./actions"
import {activeHeader} from "../Header/actions"
class Setting extends React.Component{
  state={user:this.props.user,loadingSubmit:false}
  componentWillMount(){
    this.props.onFetchSetting()
  }
  async handleSubmitSetting(event){
    this.setState({loadingSubmit:true})
    const {user} = this.props
    event.preventDefault()
    this.props.onUpdateSetting(user)
    this.props.onHandleChange("USER")
    this.props.history.push(`/@${user.username}`)
  }
  handleLogout(){
    localStorage.removeItem("jwt")
    window.location.href="/"
  }
  render(){
    const {user} = this.props
    const {loadingSubmit} = this.state
    return(
      <div className="settings-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>
              <form onSubmit={this.handleSubmitSetting.bind(this)}>
                <fieldset disabled={loadingSubmit}>
                    <fieldset className="form-group">
                      <input 
                      onChange={(e)=>{user.image=e.target.value; this.setState({user})}}
                      value={user.image?user.image:""} 
                      className="form-control" 
                      type="text" 
                      placeholder="URL of profile picture"/>
                    </fieldset>
                    <fieldset className="form-group">
                      <input 
                      onChange={(e)=>{user.username=e.target.value; this.setState({user})}}
                      value={user.username}
                      className="form-control form-control-lg" 
                      type="text" 
                      placeholder="Your Name"/>
                    </fieldset>
                    <fieldset className="form-group">
                      <textarea 
                      onChange={(e)=>{user.bio=e.target.value; this.setState({user})}}
                      value={user.bio}
                      className="form-control form-control-lg" 
                      rows="8" 
                      placeholder="Short bio about you">
                      </textarea>
                    </fieldset>
                    <fieldset className="form-group">
                      <input 
                      onChange={(e)=>{user.email=e.target.value; this.setState({user})}}
                      value={user.email}
                      className="form-control form-control-lg" 
                      type="email" 
                      placeholder="Email"/>
                    </fieldset>
                    <fieldset className="form-group">
                      <input 
                      onChange={(e)=>{user.password=e.target.value; this.setState({user})}}
                      value={user.password}
                      className="form-control form-control-lg" 
                      type="password" 
                      placeholder="New Password"/>
                    </fieldset>
                    <button className="btn btn-lg btn-primary pull-xs-right">
                      Update Settings
                    </button>
                </fieldset>
              </form>
              <hr/>
              <button onClick={this.handleLogout.bind(this)} className="btn btn-outline-danger">
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state)=>{ 
  return {
    user : state.get("SettingReducer")&&state.get("SettingReducer").user?state.get("SettingReducer").user : {},

  }
}
const mapDispatchToProps = (dispatch) =>{
   return {
     onFetchSetting:()=>{
       dispatch(fetchSetting())
     },
     onUpdateSetting:(user)=>{
       dispatch(updateSetting(user))
     },
     onHandleChange: (activeName) =>{
      dispatch(activeHeader(activeName))
    }
   }
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)
const withReducer = injectReducer({ key:'SettingReducer', reducer });
const withSaga = injectSaga ({key:"SettingSaga",saga})
export default compose(
  withConnect,
  withReducer,
  withSaga
)(Setting)