import React from "react";
import NavigationComponent from "../NavigationComponent";
import ReadMore from "../ReadMore";
import LocationComponent from "../LocationComponent";

export default class AcademicsComponent extends React.Component {
	render() {
		return <>
		<LocationComponent hasSlash={true}/>
		<h2>
			CV / Research
		</h2>
		<p>
			An aggregate of research experience I've had as well as employment, 
			education, and skills. I have done work in observational
			astrophysics, computational biophysics, and most recently have taken
			an interest in computational condensed matter physics. 
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