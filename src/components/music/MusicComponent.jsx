import React from "react";
import NavigationComponent from "../NavigationComponent";
import { Link } from "react-router-dom";
import LocationComponent from "../LocationComponent";
import { releases } from "./Releases";

export default class HomeComponent extends React.Component {
	render() {
		function makeScoreThumbnail(score) {
			return <Link className="albumLink" to={`/music/${score.id}`}>
				<img alt={score.id} src={`/images/covers/${score.image}`}/>
			</Link>
		}
		function makeReleaseThumbnail(release) {
			return <Link className="albumLink" to={`/music/${release.id}`}>
				<img src={`/images/covers/${release.cover}`} alt={release.id}/>
				</Link>
		}

		const releasesContent = releases.map(makeReleaseThumbnail);
		const scoreContent = scores.map(makeScoreThumbnail);
		return <>
		<LocationComponent hasSlash={true}/>
		<div className="albumCoverContainer">
			{releasesContent}
			{/* <Link className="albumLink" to={`/music/laplacian-demon`}>
			<img src="/images/covers/laplacian-demon.png" alt="Laplacian Demon"/>
			</Link>
			<img src="/images/covers/tsdac.png" alt="TSDAC"/> */}
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