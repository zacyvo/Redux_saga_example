import React from "react"

export default class TagList extends React.Component{
  render(){
    const {tags} = this.props
    return(
      <div className="sidebar">
        <p>Popular Tags</p>
        <div className="tag-list">
          {tags?tags.map((item,index)=>{
            return(
              <a onClick={()=>{this.props.handleClickTag(item)}} key={index} className="tag-pill tag-default">{item}</a>
            )
          }):""}
        </div>
      </div>
    )
  }
} 