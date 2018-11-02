import React from "react"

class Footer extends React.Component{
    render(){
        return(
            <footer>
            <div className="container">
                <a className="logo-font">conduit</a>
                <span className="attribution">
                An interactive learning project from <a>Thinkster</a>. Code &amp; design licensed under MIT.
                </span>
            </div>
        </footer>
        )
    }
}
export default Footer