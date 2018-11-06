/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route,withRouter } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import SignupPage from 'containers/SignupPage/Loadable';
import Setting from 'containers/Setting/Loadable';
import Editor from 'containers/Editor/Loadable';
import Profile from 'containers/Profile/Loadable';
import GlobalStyle from '../../global-styles';
import Header from "../Header/Header"
import Footer from "../../components/Footer"
import Article from "../Article/Loadable"
import './App.css';
import agent from "../agent"

 class App extends React.Component {
  state={user:"",activeName:""}
  async componentWillMount(){
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
      let data = await agent.Auth.current()
      this.setState({user:data.user})
    }else{
      this.setState({user:""})
    }
  }
  render(){
    const {user} = this.state
    return (
      <div>
        <Header user={user} />
        <div style={{minHeight:"calc(87vh)"}}>
          <Switch >
            <Route path="/article/:slug" component={Article} />
            {!user?<Route path="/signup" component={SignupPage} />:""}
            {!user?<Route path="/login" component={LoginPage} />:""}
            {user?<Route path="/settings" component={Setting} />:""}
            <Route path="/editor/:id" component={Editor} />
            <Route path="/editor" component={Editor} />
            <Route path="/@:username/favorites" component={Profile} />
            <Route path="/@:username" component={Profile} />
            <Route exact path="/" component={HomePage} />
            <Route component={HomePage} />
          </Switch>
        </div>
        <Footer/>
        <GlobalStyle />
      </div>
    );
  }
}

export default (App)
