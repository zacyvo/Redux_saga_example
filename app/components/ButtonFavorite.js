import React from "react"

export default class ButtonFavorite extends React.Component{
  render(){
    const {article,loading} = this.props
    return(
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