import React from "react"
import LocationComponent from "../LocationComponent"
import { releases } from "./Releases"
import ReactHtmlParser from 'react-html-parser';


export default function albumDisplay(props) {
	var release = {
		id: "",
		title: "Something has gone wrong.",
		date: "",
		bandcampEmbed: "",
		bandcampLink: "",
		spotifyLink: "",
		blurb: "",
		tracks: []
	}

	for (let i in releases) {
		if (releases[i].id === props.id) {
			release = releases[i];
		}
	}
	
	return <>
	<LocationComponent/>
	<h2>{release.title}</h2>
	<div className="quote">{release.date}</div>
	{ReactHtmlParser(release.bandcampEmbed)}
	<div className="logo-row">
		<div className="logoRowItem">
		<a href={release.spotifyLink} target="_blank">
			<img src="images/logos/spotify-logo.png"/>
		</a>
		</div>
		<div className="logoRowItem">
		<a href={release.bandcampLink} target="_blank">
			<img src="images/logos/bandcamp-logo.png"/>
		</a>
		</div>
	</div>
	<hr></hr>
	<div className="lyricsDisplay">
		<div className="lyricsDisplayTracklist">
            <div class="lyricsSelection" id="marinus">
                1. Marinus
            </div>
            <div class="lyricsSelection" id="mukilteo-speedway">
                2. Mukilteo Speedway
            </div>
            <div class="lyricsSelection" id="spider">
                3. Thin Black Spider Across the Lot
            </div>
            <div class="lyricsSelection" id="hypercommodity">
                4. Hypercommodity
            </div>
		</div>
	</div>
	<hr></hr>
	<p style={{textIndent:"0px"}}>
		{release.blurb}
	</p>
	</>
}