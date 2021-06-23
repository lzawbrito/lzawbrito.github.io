import { get } from "jquery";
import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { lastPage } from "./NavigationComponent";
import { pages } from "./NavigationComponent";


export default class SideNavComponent extends React.Component {
	
	render() {
		function getLink(page) {
			return <span>
			<NavLink to={page.link} className="navUnselected" activeClassName="navSelected" exact={true}>
					{page.name}
			</NavLink> 
			</span>
		}
		const links = pages.map(getLink);
		return <div className="sidenav" style={{width: this.props.width}}>
				<button onClick={this.props.closeNav}>X</button>
				{links}
			</div>
	}
}