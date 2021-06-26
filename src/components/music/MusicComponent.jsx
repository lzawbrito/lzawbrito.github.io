import React from "react";
import NavigationComponent from "../NavigationComponent";
import { Link } from "react-router-dom";

export default class HomeComponent extends React.Component {
	render() {
		function makeScoreThumbnail(score) {
			return <Link className="albumLink" to={`/music/${score.id}`}>
				<img alt={score.id} src={`/images/covers/${score.image}`}/>
			</Link>
		}
		const scoreContent = scores.map(makeScoreThumbnail)
		return <>
		<div className="albumCoverContainer">
			<img src="/images/covers/laplacian-demon.png" alt="Laplacian Demon"/>
			<img src="/images/covers/tsdac.png" alt="TSDAC"/>
		</div>
		<hr></hr>
		<div className="albumCoverContainer">
			{scoreContent}
		</div>
		</>
	}
}

export const scores = [
	{
		title: "Things to Remember",
		id: "things-to-remember",
		image: "things-to-remember.png"
	},
	{
		title: "Invisible Cities (Thin Black Spider)",
		id: "invisible-cities",
		image: "invisible-cities.jpg"
	},
	{
		title: "Video Practices",
		id: "video-practices",
		image: "videopractices.jpg"
	},
	{
		title: "SUN SHEEP GOD POWER",
		id: "sun-sheep-god-power",
		image: "sun-sheep-god-power.jpg"
	},
]