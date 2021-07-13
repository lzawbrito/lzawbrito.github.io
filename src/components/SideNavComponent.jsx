import React from "react";
import { Link, NavLink } from "react-router-dom";
import { pages } from "./NavigationComponent";
import { socials } from "./FooterComponent";


export default class SideNavComponent extends React.Component {
	
	render() {
		function getLink(page, closeNav) {
			return <span >
			<Link to={page.link} onClick={closeNav} className="navUnselected" exact={true} >
				{page.name}
			</Link> 
			</span>
		}
		function getSocial(social) {
			return <div><a className="sideNavSocials" href={social.url} target="_blank" rel="noreferrer">{social.name}</a></div>
		}
	
		const links = pages.map((elem) => getLink(elem, this.props.closeNav));
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