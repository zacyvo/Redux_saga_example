import React from "react"
import saga from "./saga"
import reducer from "./reducer"
import {connect} from "react-redux"
import {compose} from "redux"
import injectSaga from "../../utils/injectSaga"
import injectReducer from "../../utils/injectReducer"
import {fetchArticle,fetchComment,submitComment,delComment} from "./actions"
import {formatDate} from "../App/function"
import {activeHeader} from "../Header/actions"
import {Link} from "react-router-dom"
import agent from "../agent"
import ButtonFollow from "../../components/ButtonFollow"
import ButtonFavorite from "../../components/ButtonFavorite"
import Comments from "../ListComment/index"
class Article extends React.Component{
  constructor(props){
    super(props)
  }
  state={user:{},loadingFollow:false,loadingFavorite:false,textComment:""}
  async componentWillMount(){
    let articleSlug = this.props.match.params.slug
    this.props.onFetchArticle(articleSlug)
    this.props.onFetchComments(articleSlug)
    this.props.onHandleChange("")
    let token = localStorage.getItem("jwt")
    if (token) {
      agent.setToken(token);
      let data = await agent.Auth.current()
      this.setState({user:data.user})
    }else{
      this.setState({user:{}})
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
  async handleClickFllow(){
    const {user} = this.state
    const {article} = this.props.data.article
    if(user.username){
      this.setState({loadingFollow:true})
      await agent.Profile.follow(article.author.username)
      this.props.onFetchArticle(article.slug)
      this.setState({loadingFollow:false})
    }else{  
      this.props.onHandleChange("SIGN_UP")
      this.props.history.push("/signup")
    }
  }
  async handleClickUnfllow(){
    const {article} = this.props.data.article
    this.setState({loadingFollow:true})
    await agent.Profile.unfollow(article.author.username)
    this.props.onFetchArticle(article.slug)
    this.setState({loadingFollow:false})
  }
  async handleClickFavorite(){
    const {user} = this.state
    const {article} = this.props.data.article
    if(user.username){
      this.setState({loadingFavorite:true})
      await agent.Articles.favorite(article.slug)
      this.props.onFetchArticle(article.slug)
      this.setState({loadingFavorite:false})
    }else{
      this.props.onHandleChange("SIGN_UP")
      this.props.history.push("/signup")
    }
  }
  async handleClickUnfavorite(){
    const {article} = this.props.data.article
    this.setState({loadingFavorite:true})
    await agent.Articles.unfavorite(article.slug)
    this.props.onFetchArticle(article.slug)
    this.setState({loadingFavorite:false})
  }
  async handleSubmitPostComment(e){
    e.preventDefault()
    const{textComment} = this.state
    const {article} = this.props.data.article
    let comment = {
      body:textComment
    }
    this.props.onSubmitComment(article.slug,comment)
    this.setState({textComment:""})
  }
  async handleClickDelComment (e){
    let comment = JSON.parse(e)
    const {article} = this.props.data.article
    if(article.slug&&comment.id){
      this.props.onDelComment(article.slug,comment.id)
    }
  }
  handleClickEditArticle(){
    const {article} = this.props.data.article
    this.props.history.push(`/editor/${article.slug}`)
  }
  async handleClickDelArticle(){
    this.setState({loadingFavorite:true})
    const {article} = this.props.data.article
    try{
      await agent.Articles.del(article.slug)
      this.props.history.push("/")
    }catch(error){

    }
  }
  render(){
    const {data} = this.props
    const {loadingFollow,loadingFavorite,user,textComment} = this.state
    let article = {title:""}
    let comments = []
    if(data&&data.article){
      if(data.article&&data.article.article)
      article = data.article.article
      if(data.comments&&data.comments.comments)
      comments = data.comments.comments
    }
    return(
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article.title}</h1>
            <div className="article-meta">
              <Link to={`/@${article.author?article.author.username:""}`}><img src={article.author?article.author.image:""} /></Link>
              <div className="info">
                <Link to={`/@${article.author?article.author.username:""}`} className="author">{article.author?article.author.username:""}</Link>
                <span className="date">{formatDate(article.createdAt)}</span>
              </div>
              <ButtonFollow 
                own={article.author&&user.username===article.author.username}
                author={article.author}
                loading = {loadingFollow}
                handleClickEditArticle={this.handleClickEditArticle.bind(this)}
                handleClickFllow={this.handleClickFllow.bind(this)}
                handleClickUnfllow={this.handleClickUnfllow.bind(this)}
              />
              <ButtonFavorite
                own={article.author&&user.username===article.author.username}
                article={article}
                loading = {loadingFavorite}
                handleClickDelArticle={this.handleClickDelArticle.bind(this)}
                handleClickFavorite={this.handleClickFavorite.bind(this)}
                handleClickUnfavorite={this.handleClickUnfavorite.bind(this)}
              />
            </div>
          </div>
        </div>

        <div className="container page">

          <div className="row article-content">
            <div className="col-md-12">
              <div dangerouslySetInnerHTML={{ __html: article.body }}></div>              
            </div>
          </div>

          <hr />

          <div className="article-actions">
            <div className="article-meta">
              <Link to={`/@${article.author?article.author.username:""}`}><img src={article.author?article.author.image:""} /></Link>
              <div className="info">
                <Link to={`/@${article.author?article.author.username:""}`} className="author" >{article.author?article.author.username:""}</Link>
                <span className="date">{formatDate(article.createdAt)}</span>
              </div>

              <ButtonFollow 
                own={article.author&&user.username===article.author.username}
                author={article.author}
                loading = {loadingFollow}
                handleClickEditArticle={this.handleClickEditArticle.bind(this)}
                handleClickFllow={this.handleClickFllow.bind(this)}
                handleClickUnfllow={this.handleClickUnfllow.bind(this)}
              />
              <ButtonFavorite
                own={article.author&&user.username===article.author.username}
                article={article}
                loading = {loadingFavorite}
                handleClickDelArticle={this.handleClickDelArticle.bind(this)}
                handleClickFavorite={this.handleClickFavorite.bind(this)}
                handleClickUnfavorite={this.handleClickUnfavorite.bind(this)}
              />
            </div>
          </div>
          {user.username?
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form onSubmit={this.handleSubmitPostComment.bind(this)} className="card comment-form">
                <div className="card-block">
                  <textarea
                  required
                  value={textComment}
                  onChange={(e)=>{this.setState({textComment:e.target.value})}}
                  className="form-control" 
                  placeholder="Write a comment..." rows="3">
                  </textarea>
                </div>
                <div className="card-footer">
                  <img src={user.image} className="comment-author-img" />
                  <button className="btn btn-sm btn-primary">
                  Post Comment
                  </button>
                </div>
              </form>
              <Comments handleClickDelComment={this.handleClickDelComment.bind(this)} username={user.username} comments = {comments} />
            </div>
          </div>:
          <div class="row">
            <div class="col-xs-12 col-md-8 offset-md-2">
              <p style={{display: "inherit"}}>
                <a style={{color:"green"}} onClick={()=>{this.handleClickLink("SIGN_IN")}}>Sign in</a> or 
                <a style={{color:"green"}} onClick={()=>{this.handleClickLink("SIGN_UP")}}> sign up</a> to add comments on this article.
              </p>
            </div>
          </div>}
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
  return {
    data : state.get("ActicleReducer"),
  }
}
const mapDispatchToProps = (dispatch) =>{
   return {
     onFetchArticle:(articleSlug)=>{
       dispatch(fetchArticle(articleSlug))
     },
     onHandleChange: (activeName) =>{
      dispatch(activeHeader(activeName))
    },
    onFetchComments:(articleSlug)=>{
      dispatch(fetchComment(articleSlug))
    },
    onSubmitComment:(articleSlug,comment)=>{
      dispatch(submitComment(articleSlug,comment))
    },
    onDelComment:(articleSlug,commentId)=>{
      dispatch(delComment(articleSlug,commentId))
    },
    
   }
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)
const withReducer = injectReducer({ key:'ActicleReducer', reducer });
const withSaga = injectSaga ({key:"ArticleSaga",saga})
export default compose(
  withConnect,
  withReducer,
  withSaga
)(Article)