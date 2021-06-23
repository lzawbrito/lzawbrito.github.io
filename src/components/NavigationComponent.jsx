import React from "react";
import {Link} from "react-router-dom";
import { NavLink } from "react-router-dom";

export default class NavigationComponent extends React.Component {
	

	render() {
		const links = pages.map(getLink);
		

		return <div className="navigation-header">
				{links}
			</div>
	}
}

export const pages = [
	{
		name: "Home",
		link: "/home"
	},
	{
		name: "Academics",
		link: "/academics"
	},
	{
		name: "Music",
		link: "/music"	
	},
	{
		name: "Writing",
		link: "/writing"
	},
]

const isSelected = (target) => target === this.props.current;
const getSelected = (target) => isSelected(target) ? "selected" : "";

export const lastPage = pages[pages.length - 1]
function getLink(page) {
	return <span>
	<NavLink to={page.link} className="navUnselected" activeClassName="navSelected" exact={true}>
			{page.name}
	</NavLink> 
	{(page === lastPage) ? "" : "|"}
	</span>
}