import React from 'react';
import {withRouter} from "react-router-dom"
import agent from "../agent"
class Editor extends React.Component {
  constructor (props){
    super(props);
    this.state={
      editor:{},
      textTag:"",
      loading:false,
      messagesError:[]
    }
  }
  async componentWillMount(){
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
      let userData = await agent.Auth.current()
      let slug = this.props.match.params.id
      if(slug){
        let editorData = await agent.Articles.get(slug)
        if(editorData.article.author.username===userData.user.username){
          this.setState({editor:editorData.article})
        }else{
          this.props.history.push("/")
        }
      }
    }else{
      this.props.history.push("/")
    }

  }
  handleEnter(e){
    const {editor,textTag} = this.state
    if(e.key==="Enter"&&textTag.trim()){
      if(!editor.tagList){
        editor.tagList = []
        editor.tagList.push(textTag)
        this.setState({editor,textTag:""})
      }else{
        let index = editor.tagList.indexOf(textTag)
        if(index===-1){
          editor.tagList.push(textTag)
          this.setState({editor,textTag:""})
        }
      }
    }
  }
  handleDelTag(item,index){
    const {editor} = this.state
    editor.tagList.splice(index,1)
    this.setState({editor})
  }
  async handldeClickPushlish(){
    const {editor} = this.state
    if(editor.title){
      this.setState({loading:true})
      try{
        if(editor.slug){
          let data = await agent.Articles.update(editor)
          if(data.article.slug){
            this.props.history.push(`/article/${data.article.slug}`)
          }
        }else{
          let data = await agent.Articles.create(editor)
          if(data.article.slug){
            this.props.history.push(`/article/${data.article.slug}`)
          }
        }
      }catch(error){
        let messagesError = []
        let messages = Object.values(error)[1].body.errors
        let messagesValue = Object.values(messages)
        messagesValue.forEach((item,index)=>{
          let err = {
            name: Object.keys(messages)[index],
            value:item
          }
          messagesError.push(err)
        })
        this.setState({messagesError,loading:false})
      }
    }
  }
  render(){
  const {editor,textTag,messagesError,loading} = this.state
  return(
    <div class="editor-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            {messagesError.length>0?
              messagesError.map((item,index)=>{
                return(
                item.value.map((err,id)=>{
                  return(
                    <ul key={id} className="error-messages">
                      <li>{item.name} {err}</li>
                    </ul>
                  )
                })
                )
             })
            :""}
            <form>
              <fieldset disabled={loading}>
                <fieldset class="form-group">
                    <input 
                    onChange={(e)=>{editor.title = e.target.value; this.setState({editor})}}
                    value={editor.title}
                    type="text" 
                    class="form-control form-control-lg" 
                    placeholder="Article Title"/>
                </fieldset>
                <fieldset class="form-group">
                    <input 
                    onChange={(e)=>{editor.description = e.target.value; this.setState({editor})}}
                    value={editor.description}
                    type="text" class="form-control" 
                    placeholder="What's this article about?"/>
                </fieldset>
                <fieldset class="form-group">
                    <textarea
                    onChange={(e)=>{editor.body = e.target.value; this.setState({editor})}}
                    value={editor.body}
                    class="form-control" 
                    rows="8" 
                    placeholder="Write your article (in markdown)"></textarea>
                </fieldset>
                <fieldset class="form-group">
                    <input 
                    onKeyPress={(e)=>this.handleEnter(e)}
                    onChange={(e)=>{this.setState({textTag:e.target.value})}}
                    value={textTag}
                    type="text" 
                    class="form-control" 
                    placeholder="Enter tags"/>
                    <div class="tag-list">
                    {editor.tagList?editor.tagList.map((item,index)=>{
                      return(
                        <span key={index} class="tag-default tag-pill ng-binding ng-scope">
                          <i onClick={()=>this.handleDelTag(item,index)} class="ion-close-round" ></i>
                          {item}
                        </span>
                      )
                    }):""}
                    </div>
                </fieldset>
                <button onClick={this.handldeClickPushlish.bind(this)} class="btn btn-lg pull-xs-right btn-primary" type="button">
                    Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
  }
}

export default withRouter(Editor)