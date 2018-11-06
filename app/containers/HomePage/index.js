
import React from 'react';
import TagList from "../../components/TagList"
import Articles from "../../components/Articles"
import Pagination from "../../components/Pagination"
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import {fetchArticles,fetchUpdateArticles} from "./actions"
import {activeHeader} from "../Header/actions"
import agent from "../agent"
class HomePage extends React.Component {
  state ={
    tags :[],
    loadingArticles:false,
    activePagination:1,
    articlesCount:0,
    tagSelected:"",
    user:{}
  }
  async componentDidMount(){
    let token = localStorage.getItem("jwt")
    if (token) {
      agent.setToken(token);
      let data = await agent.Auth.current()
      this.setState({user:data.user})
    }else{
      this.setState({user:{}})
    }
    let tagsOjb = await agent.Tags.getAll()
    this.setState({tags:tagsOjb.tags})
    this.props.onFetchArticles(1)
  }
  async handleClickPagination(e){
    const {tagSelected} = this.state
    this.setState({loadingArticles:true})
    await this.props.onFetchArticles(e,tagSelected)
    this.setState({activePagination:e,loadingArticles:false})
  }
  handleClickTag(e){
    this.setState({tagSelected:e})
    this.props.onFetchArticles(1,e)
  }
  handleClickArticle(e){
    let article = JSON.parse(e)
    this.props.history.push(`/article/${article.slug}`)
  }
  handleClickFavorite(e,index){
    const {user} = this.state
    if(user.id){
      let article = JSON.parse(e)
      this.props.onUpdateArticle(article.slug)
    }
    else{
      this.props.onHandleClickLink("SIGN_UP")
      this.props.history.push('/signup')
    }
  }
  handleClickUser(e){
    let user = JSON.parse(e)
    this.props.history.push(`/@${user.username}`)
  }
  render() {
    const {loadingArticles,activePagination,tags,tagSelected} = this.state
    const {articles} = this.props
    return (
      <div>
        <div className="home-page">
          <div class="banner">
            <div class="container">
              <h1 class="logo-font">conduit</h1>
              <p>A place to share your knowledge.</p>
            </div>
          </div>
          <div class="container page">
            <div class="row">
              <div class="col-md-9">
                <div class="feed-toggle">
                  <ul class="nav nav-pills outline-active">
                    <li class="nav-item">
                      <a onClick={()=>{this.props.onFetchArticles(1);this.setState({tagSelected:"",activePagination:1})}} class={`nav-link ${!tagSelected?"active":""}`}>Global Feed</a>
                    </li>
                    {tagSelected?
                    <li class="nav-item">
                    <a onClick={()=>{this.props.onFetchArticles(1,tagSelected)}} class="nav-link active"># {tagSelected}</a>
                  </li>:""}
                  </ul>
                </div>
                <Articles 
                handleClickFavorite={this.handleClickFavorite.bind(this)}
                loading={loadingArticles} 
                articles={articles.articles?articles.articles:[]} 
                handleClickArticle={this.handleClickArticle.bind(this)}
                handleClickUser = {this.handleClickUser.bind(this)}
                />
                <Pagination 
                articlesCount={articles.articlesCount} 
                activePagination={activePagination} 
                handleClickPagination={this.handleClickPagination.bind(this)}
                />
              </div>
              <div class="col-md-3">
                <TagList 
                  handleClickTag = {this.handleClickTag.bind(this)}
                  tags={tags}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateProps = (state) =>{  
  return {articles: state.get("HomePageReducer")? state.get("HomePageReducer") : {},}
}

const mapDispatchToProps = (dispatch) =>{
  return {
    onFetchArticles: (pageNumber,tag) =>{
      dispatch(fetchArticles(pageNumber,tag))
    },
    onUpdateArticle:(slug)=>{
      dispatch(fetchUpdateArticles(slug))
    },
    onHandleClickLink: (activeName) =>{
      dispatch(activeHeader(activeName))
    },
  } 
}
const withConnect = connect(
  mapStateProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'HomePageReducer', reducer });
const withSaga = injectSaga({ key: 'HomePageSaga', saga });

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(HomePage);