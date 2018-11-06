import React from "react"
import {formatDate} from "../containers/App/function"
import {Link} from "react-router-dom"
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
              <Link to={`/@${article.author.username}`}><img src={article.author.image} /></Link>
              <div className="info">
                <Link to={`/@${article.author.username}`} className="author">{article.author.username}</Link>
                <span className="date">{formatDate(article.updatedAt)}</span>
              </div>
              <button onClick={()=>this.props.handleClickFavorite(JSON.stringify(article),index)} className={`btn ${article.favorited?"btn-primary":"btn-outline-primary"} btn-sm pull-xs-right`}>
                <i className="ion-heart"></i> {article.favoritesCount}
              </button>
            </div>
            <Link to={`/article/${article.slug}`} className="preview-link">
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
            </Link>
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
