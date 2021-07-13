import React from "react"
import LocationComponent from "../LocationComponent"
import { releases } from "./Releases"
import ReactHtmlParser from 'react-html-parser';
import ReactMarkdown from 'react-markdown';
import LyricsSelector from "./LyricsSelector";

export default function albumDisplay(props) {
	var release = null

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
		<a href={release.spotifyLink} target="_blank" rel="noreferrer">
			<img src="images/logos/spotify-logo.png" alt="spotify-logo"/>
		</a>
		</div>
		<div className="logoRowItem">
		<a href={release.bandcampLink} target="_blank" rel="noreferrer">
			<img src="images/logos/bandcamp-logo.png" alt="spotify-logo"/>
		</a>
		</div>
	</div>
	<hr></hr>
	<div className="lyricsDisplay">
		<LyricsSelector tracks={release.tracks}/>
	</div>
	<hr></hr>
	<ReactMarkdown>{release.blurb}</ReactMarkdown>
	</>
}