import React from "react"

export default class Pagination extends React.Component{
  render(){
    const {articlesCount,activePagination} = this.props
    let numbeOfPage = 10
    let arrPaginations =[]
    for (let index = 0; index < Math.ceil(articlesCount/numbeOfPage); index++) {
      arrPaginations.push(index)
    }
    return(
      <nav>
        <ul class="pagination">
          {arrPaginations.map((item,index)=>{
            return(
            <li key={index} class={`page-item ng-scope ${activePagination===index+1?"active":""}`}>
              <a onClick={()=>{this.props.handleClickPagination(index+1)}} class="page-link ng-binding" >{index+1}</a>
            </li>
            )
          })}
        </ul>
      </nav>
    )
  }
} 