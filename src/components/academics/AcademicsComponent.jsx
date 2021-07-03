import React from "react";
import NavigationComponent from "../NavigationComponent";
import ReadMore from "../ReadMore";
import LocationComponent from "../LocationComponent";
export default class AcademicsComponent extends React.Component {
	render() {
		return <>
		<LocationComponent hasSlash={true}/>
		<h2>
			Research
		</h2>
		<p>
			I am currently researching dark matter under Professor 
			Ian Dell'Antonio. In particular, I am applying machine learning 
			techniques to weak gravitational lensing detection. 
		</p>
		<ReadMore to="/academics/research"></ReadMore>	
		<hr/>
		<h2>
			Coursework
		</h2>
		<p>Here is a list of all the courses I have taken at Brown, subjects 
			I've studied on my own, and associated lecture notes.
		</p>
		<ReadMore to="/academics/coursework"></ReadMore>	
		<hr/>
		</>
	}
}