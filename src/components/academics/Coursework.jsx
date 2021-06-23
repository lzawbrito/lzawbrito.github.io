import React from "react";
import LocationComponent from "../LocationComponent";

export default class AcademicsComponent extends React.Component {
	render() {
		return <>
			<LocationComponent/>
			<body>
				<h2>Fall 2021 (provisional list)</h2>
				<ul>
					<li><span className="quote"> PHYS2050 - Quantum Mechanics (Graduate)</span></li>
					<li><span className="quote"> PHYS1510 - Advanced Electromagnetic Theory</span></li>
					<li><span className="quote"> CSCI0320 - Introduction to Software Engineering</span></li>
					<li><span className="quote"> MATH1260 - Complex Analysis</span></li>
				</ul>
				<h2>Summer 2021</h2>
				<ul>
					<li><span className="quote"> PHYS2050 - Independent Study in Electromagnetism </span></li>
					<li><span className="quote"> MATH1530 - Abstract Algebra</span></li>
					<li><span className="quote"> CSCI1951A - Data Science</span></li>
					<li><span className="quote"> PHIL0211 - Modern Political Philosophy </span></li>
				</ul>
				<h2>Spring 2021</h2>
				<ul>
					<li><span className="quote"> PHIL1283 - Philosophy of Quantum Mechanics</span></li>
					<li><span className="quote"> PHYS0070 - Analytical Mechanics</span></li>
					<li><span className="quote"> PHYS0500 - Advanced Classical Mechanics</span></li>
					<li><span className="quote"> MATH1120 - Partial Differential Equations </span></li>
				</ul>
				<h2>Fall 2020</h2>
				<ul>
					<li><span className="quote"> CSCI0190 - Accelerated Introduction to Computer Science</span></li>
					<li><span className="quote"> Linear Algebra</span></li>
				</ul>
				<h2>Summer 2020</h2>
				<ul>
					<li><span className="quote"> Multivariable Calculus </span></li>
				</ul>
			</body>
		</>
	}
}