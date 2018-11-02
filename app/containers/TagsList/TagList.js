import React from "react"
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from '../../utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import {fetchTags} from "./actions"
 class TagList extends React.Component{
  render(){
    const {tags} = this.props
    return(
      <div class="sidebar">
        <p>Popular Tags</p>
        <div class="tag-list">
          <a class="tag-pill tag-default">programming</a>
          <a class="tag-pill tag-default">javascript</a>
          <a class="tag-pill tag-default">emberjs</a>
          <a class="tag-pill tag-default">angularjs</a>
          <a class="tag-pill tag-default">react</a>
          <a class="tag-pill tag-default">mean</a>
          <a class="tag-pill tag-default">node</a>
          <a class="tag-pill tag-default">rails</a>
        </div>
      </div>
    )
  }
} 
const mapStateProps = (state) =>{  
  console.log("here", state.get("TagsReducer"));
  
  return {
    tags: state.get("TagsReducer")? state.get("TagsReducer") : {},
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    onFetchTags: () =>{
      dispatch(fetchTags())
    },
  } 
}
const withConnect = connect(
  mapStateProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'TagsReducer', reducer });
const withSaga = injectSaga({ key: 'TagsReducer', saga });
export default compose(
  withReducer,
  withConnect,
  withSaga,
) (TagList)