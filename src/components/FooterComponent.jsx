import React from "react";

export default class FooterComponent extends React.Component{

	render() {
		const lastSocial = socials[socials.length - 1];
		function makeLink(social) {
			return <span>
			<a href={social.url} target="_blank">
				{social.name}
			</a> 
			{(social === lastSocial) ? "" : " | "}
			</span>
		}
		const socialLinks = socials.map(makeLink);
		return <footer>
			{socialLinks}
		</footer>
	}
}

export const socials = [
	{
		name: "Instagram",
		url: "https://www.instagram.com/lzawbrito/"
	},
	{
		name: "Twitter",
		url: "https://twitter.com/lucaszawbrito"
	},
	{
		name: "LinkedIn",
		url: "https://www.linkedin.com/in/lucas-brito-9165a11a0/"
	},
	{
		name: "GitHub",
		url: "https://github.com/lzawbrito"
	},
	{
		name: "Email",
		url: "mailto:lucas_brito@brown.edu"
	}
]
