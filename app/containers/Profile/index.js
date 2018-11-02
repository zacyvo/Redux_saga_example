import React from "react"
import saga from "./saga"
import reducer from "./reducer"
import {connect} from "react-redux"
import {compose} from "redux"
import injectSaga from "../../utils/injectSaga"
import injectReducer from "../../utils/injectReducer"
import {fetchProfile,fetchArticlesByAuthor} from "./actions"
import {activeHeader} from "../Header/actions"
import UserInfo from "../../components/UserInfo"
import Articles from "../../components/Articles"
import { Link } from 'react-router-dom';
import agent from "../agent"

class Profile extends React.Component{
  constructor(props){
    super(props)
  }
  state={
    isFavorites:""
  }
  async componentWillMount(){
    let username = this.props.match.params.username
    let patch = window.location.pathname.split("/")
    if(patch[2]){
      this.setState({isFavorites:true})
    }
    await this.props.onFetchProfile(username)
  }
  componentWillReceiveProps(){
    let patch = window.location.pathname.split("/")
    if(patch[2]){
      this.setState({isFavorites:true})
    }else{
      this.setState({isFavorites:false})
    }
  }
  
  handleClickLink(e){
    switch (e) {
      case "HOME":
      this.props.onHandleChange("HOME")
      this.props.history.push("/")
        break;
      case "SIGN_IN":
        this.props.onHandleChange("SIGN_IN")
        this.props.history.push("/login")
          break;
      case "SIGN_UP":
        this.props.onHandleChange("SIGN_UP")
        this.props.history.push("/signup")
          break;
      default:
        break;
    }
  }
  handleClickArticle(){

  }
  render(){
    const {profile,articles} = this.props
    const {isFavorites} = this.state
    console.log("here",profile);
    
    return(
      <div class="profile-page">
        <UserInfo 
        profile={profile}/>
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <div class="articles-toggle">
                <ul class="nav nav-pills outline-active">
                  <li class="nav-item">
                    <Link to={`/@${profile.username}`}  class={`nav-link ${isFavorites?"":"active"}`}>My Articles</Link>
                  </li>
                  <li class="nav-item">
                    <Link to={`/@${profile.username}/favorites`} class={`nav-link ${isFavorites?"active":""}`} >Favorited Articles</Link>
                  </li>
                </ul>
              </div>
              <Articles 
                loading={false} 
                articles={[]} 
                handleClickArticle={this.handleClickArticle.bind(this)}
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
  return {
    profile : state.get("ProfileReducer")&&state.get("ProfileReducer").profile?state.get("ProfileReducer").profile : {},
    /* articles: state.get("HomePageReducer")? state.get("HomePageReducer") : {},  */
  }
}
const mapDispatchToProps = (dispatch) =>{
   return {
     onFetchProfile:(username)=>{
       dispatch(fetchProfile(username))
     },
     onHandleChange: (activeName) =>{
      dispatch(activeHeader(activeName))
    },
    onFetchArticlesByAuthor:(numberPage,username)=>{
      dispatch(fetchArticlesByAuthor(numberPage,username))
    },
   }
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)
const withReducer = injectReducer({ key:'ProfileReducer', reducer });
const withSaga = injectSaga ({key:"ProfileSaga",saga})
export default compose(
  withConnect,
  withReducer,
  withSaga
)(Profile)