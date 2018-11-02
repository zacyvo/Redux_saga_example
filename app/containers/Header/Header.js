import React from 'react';
import {withRouter} from "react-router-dom"
import { connect } from 'react-redux';
import { compose } from 'redux';
import {activeHeader} from "./actions"
import saga from './saga';
import injectSaga from '../../utils/injectSaga';
import { Link } from 'react-router-dom';
class Header extends React.Component {
  constructor (props){
    super(props);
    this.state={
      pathName:""
    }
  }
  componentWillMount(){
    let patch = window.location.pathname.split("/")[1]
    switch (patch) {
      case "login":
        this.setState({pathName:"SIGN_IN"})
        break;
      case "signup":
        this.setState({pathName:"SIGN_UP"})
        break;
      case "editor":
        this.setState({pathName:"NEW_POST"})
        break;
      case "settings":
        this.setState({pathName:"SETTING"})
        break;
      default:
        this.setState({pathName:"HOME"})
        break;
    }
  }
  render(){
  const {activeNameRoot,user} = this.props
  let activeName = activeNameRoot?activeNameRoot:this.state.pathName
  return(
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" >conduit</a>
        <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link onClick={()=>this.props.onHandleChange("HOME")} to="/" className={`nav-link ${activeName==="HOME"?"active":""} `} >Home</Link>
        </li>
        {!user.username?
        <li className="nav-item">
          <Link onClick={()=>this.props.onHandleChange("SIGN_IN")} to="/login" className={`nav-link ${activeName==="SIGN_IN"?"active":""} `}  >
          Sign in
          </Link>
        </li>:
        <li class="nav-item">
          <Link onClick={()=>this.props.onHandleChange("NEW_POST")} to="/editor"  className={`nav-link ${activeName==="NEW_POST"?"active":""} `}>
            <i class="ion-compose"></i>&nbsp;New Post
          </Link>
        </li>}
        {!user.username?
        <li className="nav-item">
            <Link onClick={()=>this.props.onHandleChange("SIGN_UP")} to="/signup" className={`nav-link ${activeName==="SIGN_UP"?"active":""} `}>
            Sign up
            </Link>
        </li>:
        <li className="nav-item">
          <Link  onClick={()=>this.props.onHandleChange("SETTING")} to="/settings" className={`nav-link ${activeName==="SETTING"?"active":""} `}>
            <i className="ion-gear-a"></i>&nbsp;Settings
          </Link>
        </li>}
        {user.username?
        <li class="nav-item">
          <Link  onClick={()=>this.props.onHandleChange("USER")} to={`/@${user.username}`} className={`nav-link ${activeName==="USER"?"active":""} `}>
            {user.username}
          </Link>
        </li>:""}
        </ul>
      </div>
    </nav>
  )
  }
}
const mapStateProps = (state) =>{
  return {
    activeNameRoot: state.get("headerReducer").activeName,
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
      onHandleChange: (activeName) =>{
        dispatch(activeHeader(activeName))
      }
  } 
}

const withSaga = injectSaga({ key: 'home', saga });

export default compose(connect(mapStateProps,mapDispatchToProps),withSaga)(withRouter(Header))