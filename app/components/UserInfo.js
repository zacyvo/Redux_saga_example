import React from "react"
import agent from "../containers/agent"
class UserInfo extends React.Component{
  state={user:{}}
  async componentWillMount(){
  let token = localStorage.getItem("jwt")
    if (token) {
      agent.setToken(token);
      let data = await agent.Auth.current()
      this.setState({user:data.user})
    }else{
      this.setState({user:{}})
    }
  }
  render(){
    const{profile} = this.props
    const {user} = this.state
    return(
      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <img src={profile.image} class="user-img" />
              <h4>{profile.username}</h4>
              <p>
              {profile.bio}
              </p>
              {user.username!==profile.username?
              <button onClick={()=>this.props.handleClickFollow()} class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow {profile.username}
              </button>:
              <button onClick={()=>this.props.handleClickSetting()} class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-gear-a"></i>
              &nbsp;
              Edit Profile Settings
              </button>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default UserInfo