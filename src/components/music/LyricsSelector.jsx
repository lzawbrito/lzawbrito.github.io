import React from 'react'
import ReactMarkdown from 'react-markdown';
import HtmlParser from 'react-html-parser';

export default class LyricsSelector extends React.Component {
	tracks = null;
	constructor(props) {
		super(props);
		this.tracks = this.props.tracks
		const trackStates = this.props.tracks.map((t) => ({
			name: t.name,
			isClicked: false,
			isHovered: false
		}))

		this.state = {
			trackStates: trackStates
		}
	}

	handleClick(song) {
		var updatedTrackStates = this.state.trackStates.map(function(t) {
			if (t.name === song) {
				return {
					name: t.name,
					isClicked: !t.isClicked,
					isHovered: t.isHovered
				}
			} else {
				return {
					name: t.name,
					isClicked: false,
					isHovered: t.isHovered
				}
			}
		})

		this.setState({trackStates: updatedTrackStates});
	}

	handleMouseEnter(song) {
		var updatedTrackStates = this.state.trackStates.map(function(t) {
			if (t.name === song) {
				return {
					name: t.name,
					isClicked: t.isClicked,
					isHovered: true 
				}
			} else {
				return {
					name: t.name,
					isClicked: t.isClicked,
					isHovered: false
				}
			}
		})

		this.setState({trackStates: updatedTrackStates});
	}

	handleMouseLeave(song) {
		var updatedTrackStates = this.state.trackStates.map(function(t) {
			if (t.name === song) {
				return {
					name: t.name,
					isClicked: t.isClicked,
					isHovered: false
				}
			} else {
				return t
			}
		})

		this.setState({trackStates: updatedTrackStates});
	}

	render() {
		var trackNum = 0;
		const findTrack = (trackname) => { 
			for (let i in this.state.trackStates) { 
				if (this.state.trackStates[i].name === trackname) {
					trackNum = Number(i) + 1;
					return this.state.trackStates[i]
				}
			}
		}
		const makeTrack = (t) =>	 {
			var trackState = findTrack(t.name)
			const content = `${trackNum}. ${t.name}`
			if (trackState.isClicked || trackState.isHovered) {
				return <>
					<div className = "lyricsSelected"
					onClick={() => this.handleClick(t.name)}
					onMouseEnter={() => this.handleMouseEnter(t.name)}
					onMouseLeave={() => this.handleMouseLeave(t.name)}
					>
						{content}
					</div>

				</>
			} else {
				return <>
					<div className = "lyricsUnselected"
					onClick={() => this.handleClick(t.name)}
					onMouseEnter={() => this.handleMouseEnter(t.name)}
					onMouseLeave={() => this.handleMouseLeave(t.name)}
					>	
						{content}
					</div>
				</>
			}
		}

		const makeLyrics = (t) => {
			var trackState = findTrack(t.name) 
			const content = t.lyrics
			if (trackState.isClicked) {
				return <>
					<a href={`tabs/${t.tabs}`} target="_blank"><code>{(t.tabs) ? "---- Tabs ----" : "" }</code></a>
					{HtmlParser(
						"<p>" + 
						content.replaceAll('\t', '').replaceAll('\n', '<br>')
						+ "</p>"
					)}

				</>
			} else if (!trackState.isClicked) {
				return <div className="hide">
					{content}
				</div>
			} else {
				return <div className="hide">
					Test
				</div>
			}
		}

		const trackList = this.tracks.map(makeTrack)
		const lyrics = this.tracks.map(makeLyrics)
		return <>
		<div className="lyricsDisplayTracklist">
			{trackList}
		</div>
		<div className="lyricsContainer">
			{lyrics}
		</div>
		</>
	}
}