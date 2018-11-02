import React from "react"

export default class ButtonFollow extends React.Component{
  render(){
    const {author,loading} = this.props
    return(
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