import React from "react"

export default class ButtonFollow extends React.Component{
  render(){
    const {author,loading,own} = this.props
    return(
      own?
      <button style={{marginRight:"10px"}} disabled={loading} onClick={()=>this.props.handleClickEditArticle()} className="btn btn-outline-secondary btn-sm">
        <i className="ion-edit"></i>
        &nbsp;
        Edit Article
      </button>:
      author&&author.following?
        <button style={{marginRight:"10px"}} disabled={loading} onClick={()=>this.props.handleClickUnfllow()} className="btn btn-sm btn-outline-secondary">
          <i className="ion-plus-round"></i>
          &nbsp;
          Unfollowing {author?author.username:""}
        </button>:
        <button style={{marginRight:"10px"}} disabled={loading} onClick={()=>this.props.handleClickFllow()} className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round"></i>
        &nbsp;
        Follow {author?author.username:""}
      </button>
    )
  }
}