import React from "react";
import {Link} from "react-router-dom"

export default class ReadMore extends React.Component {
	render(	){
		return <div className="ReadMore"><Link to={this.props.to}>Read more...</Link></div>
	}
}