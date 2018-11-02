import React from "react"

class UserInfo extends React.Component{
  render(){
    const{profile} = this.props
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
              <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow {profile.username}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default UserInfo