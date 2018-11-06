import React from "react"

export default class ButtonFavorite extends React.Component{
  render(){
    const {article,loading,own} = this.props
    return(
      own?
        <button disabled={loading} onClick={()=>this.props.handleClickDelArticle()} className="btn btn-outline-danger btn-sm">
          <i className="ion-trash-a"></i>
          &nbsp;
          Delete Article
        </button>:
      article&&article.favorited?
        <button disabled={loading} onClick={()=>this.props.handleClickUnfavorite()} className="btn btn-sm btn-outline-secondary">
          <i className="ion-heart"></i>
          &nbsp;
          Unfavorite Article <span className="counter">({article.favoritesCount})</span>
        </button>:
        <button  disabled={loading} onClick={()=>this.props.handleClickFavorite()} className="btn btn-sm btn-outline-primary">
          <i className="ion-heart"></i>
          &nbsp;
          Favorite Article <span className="counter">({article.favoritesCount})</span>
        </button>
    )
  }
}