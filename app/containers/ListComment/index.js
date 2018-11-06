import React from "react"
import {formatDate} from "../App/function"
import {Link} from "react-router-dom"
class Comments extends React.Component{
  render(){
    const {comments,username} = this.props
    return(
      <div>
        {comments.length>0?
          comments.map((item,index)=>{
            return(
            <div key={index} className="card">
              <div className="card-block">
                <p className="card-text">{item.body}</p>
              </div>
              <div className="card-footer">
                <Link to={`/@${item.author.username}`} className="comment-author">
                  <img src={item.author?item.author.image:""} className="comment-author-img" />
                </Link>
                &nbsp;
                <Link to={`/@${item.author.username}`} className="comment-author">{item.author?item.author.username:""}</Link>
                <span className="date-posted">{formatDate(item.createdAt,true)}</span>
               {item.author&&username===item.author.username?
                <span onClick={()=>this.props.handleClickDelComment(JSON.stringify(item))} class="mod-options">
                  <i class="ion-trash-a"></i>
                </span>:""}
              </div>
            </div>
            )
          }):""}
      </div>
    )
  }
}
export default (Comments)