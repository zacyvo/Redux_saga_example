import React from "react"
import saga from "./saga"
import reducer from "./reducer"
import {connect} from "react-redux"
import {compose} from "redux"
import injectSaga from "../../utils/injectSaga"
import injectReducer from "../../utils/injectReducer"
import {fetchComment} from "./actions"
class Comments extends React.Component{
  constructor(props){
    super(props)
  }
  async componentWillMount(){
    
  }
  render(){
    return(
      <div>
        <div className="card">
          <div className="card-block">
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div className="card-footer">
            <a href="" className="comment-author">
              <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
            </a>
            &nbsp;
            <a href="" className="comment-author">Jacob Schmidt</a>
            <span className="date-posted">Dec 29th</span>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
  
  
  return {comments : state.get("CommentsReducer")}
}
const mapDispatchToProps = (dispatch) =>{
   return {
     onFetchComments:(articleSlug)=>{
       dispatch(fetchComment(articleSlug))
     }
   }
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)
const withReducer = injectReducer({ key:'CommentsReducer', reducer });
const withSaga = injectSaga ({key:"CommentsReducer",saga})
export default compose(
  withConnect,
  withReducer,
  withSaga
)(Comments)