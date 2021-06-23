import React from "react";
import {Link} from "react-router-dom";

export default class LocationComponent extends React.Component {

	render() {
		const url = window.location.href	
		const suburl = url.split("#/")[1];
		const path = suburl.split("/");
		console.log(path);
		var i = 0;
		function getLink(page) {
			const currentHrefList = path.slice(0,i + 1);
			console.log(currentHrefList)
			var currentHref = "";
			for (let p in currentHrefList) {
				currentHref += "/" + currentHrefList[p]
			}
			i += 1; 
			return <span><Link to={currentHref}> {page} </Link>{(path.length == i) ? "" : " / "}</span>
		}
		const links = path.map(getLink)
		return <>
		<div className="Location">
			{links}
		</div>
		</>
	}
}