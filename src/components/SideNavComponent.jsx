import React from "react";
import { NavLink } from "react-router-dom";
import { pages } from "./NavigationComponent";
import { socials } from "./FooterComponent";


export default class SideNavComponent extends React.Component {
	
	render() {
		function getLink(page) {
			return <span >
			<NavLink  to={page.link} className="navUnselected" activeClassName="navSelected" exact={true} >
					{page.name}
			</NavLink> 
			</span>
		}
		function getSocial(social) {
			return <div><a className="sideNavSocials" href={social.url} target="_blank">{social.name}</a></div>
		}
	
		const links = pages.map(getLink);
		const socialLinks = socials.map(getSocial);
		return <div className="sidenav" style={{width: this.props.width}}>
				<a className="navUnselected" onClick={this.props.closeNav} style={{cursor:`pointer`}}>(X)</a>
				{links}
			<div className="sideNavSocialsBlock" style={{bottom:50}}>
				{socialLinks}
				</div>
			</div>
	}
}