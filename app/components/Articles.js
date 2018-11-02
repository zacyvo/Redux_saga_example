import React from "react"
import {formatDate} from "../containers/App/function"
export default class Articles extends React.Component{
  render(){
    const {articles,loading} = this.props
    return(
      <div>
        {articles.length>0?
        articles.map((article,index)=>{
          return(
          <div key={index} className="article-preview">
            <div className="article-meta">
              <a onClick={()=>this.props.handleClickUser(JSON.stringify(article.author))}><img src={article.author.image} /></a>
              <div className="info">
                <a onClick={()=>this.props.handleClickUser(JSON.stringify(article.author))} className="author">{article.author.username}</a>
                <span className="date">{formatDate(article.updatedAt)}</span>
              </div>
              <button className="btn btn-outline-primary btn-sm pull-xs-right">
                <i className="ion-heart"></i> {article.favoritesCount}
              </button>
            </div>
            <a onClick={()=>{this.props.handleClickArticle(JSON.stringify(article))}} className="preview-link">
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <span>Read more...</span>
              {article.tagList.length>0?
              <ul className="tag-list">
                {article.tagList.map((tag,indexTag)=>{
                  return(
                  <li key={indexTag} className="tag-default tag-pill tag-outline ng-binding ng-scope" >
                    {tag}
                  </li>
                  )})}
              </ul>:""}
            </a>
          </div>
          )}):
          <div className="article-preview ng-hide">
            No articles are here... yet.
          </div>}
          {loading?
          <div className="article-preview ng-hide" >
            Loading articles...
          </div>:""}
        </div>
    )
  }
} 
