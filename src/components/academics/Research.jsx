import LocationComponent from "../LocationComponent";
import React from "react";

export default class Research extends React.Component {
	render(){
		return <>
		<LocationComponent/>
		<body>
			<h2>Research</h2>
			<p>
			I am currently doing research in dark matter cosmology under  
			<a href="https://vivo.brown.edu/display/idellant"> Professor Ian 
			Dell'Antonio</a>. In particular, we are using <a href="https://ned.ipac.caltech.edu/level5/Tyson2/Tyson_contents.html"
			>weak gravitational lensing</a> to study dark matter distributions 
			in galactic clusters. 
			</p>
			<p>
			The particular project I'm involved in is an extension of a 
			<a href="https://arxiv.org/abs/1906.00970"> recent publication by 
			Huang, et al.</a> wherein new instances of strongly lensed objects 
			were discovered using a trained machine learning model. We are
			interested in training the same model to classify instances of weak 
			lensing as well as strong lensing, and using these newly detected 
			lenses to further study lensing distribution.
			</p>
		</body>

		</>
	}
}