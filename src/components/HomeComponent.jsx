import React from "react";
import NavigationComponent from "./NavigationComponent";
import me from '../images/me-round.png';

export default class HomeComponent extends React.Component {
	render() {
		return <>
		<img src={me} alt="Me" className="centerImage"></img>
		<p>
		Astrophysics and computer science student at Brown University. Songwriter and occasional writer. Interested in 
		math, philosophy, and powerlifting.
		</p>
		<p>
		I was born in San Francisco, grew up in Brazil, and am currently living in the suburbs of Seattle. 
		I'm fluent in Portuguese and conversational in Spanish and Italian. Don't hesitate to reach out if 
		you have any inquiries---if you're on desktop, my socials can be found below, and 
		if you're on mobile, they're under the {'\u00a7'} along with the navigation menu. 
		</p>
		</>
	}
}