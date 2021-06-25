import React from "react";
import LocationComponent from "../LocationComponent";

export default class AcademicsComponent extends React.Component {
	render() {
		function makeCourse(c) {
			if (c.hasNotes) {
				return <li><span className="quote"><a href={`/notes/${c.notes}`} target="_blank">{c.name}</a></span></li>
			} else {
				return <li><span className="quote">{c.name}</span></li>
			}
		}

		function makeTerm(t) {
			return <>
				<h2>{t.term}</h2>
				<ul>
					{t.courses.map(makeCourse)}
				</ul>
			</>
		}
		const content = courseworkList.map(makeTerm);

		return <>
			<LocationComponent/>
			<body>
				{content}
			</body>
		</>
	}
}


export const courseworkList = [
	{
		term: "Fall 2021 (Provisional List)",
		courses: [
			{
				name: "PHYS2050 - Quantum Mechanics (Graduate)",
				hasNotes: false
			},
			{
				name: "PHYS1510 - Advanced Electromagnetic Theory",
				hasNotes: false
			},
			{
				name: "CSCI0320 - Introduction to Software Engineering",
				hasNotes: false
			},
			{
				name: "MATH1260 - Complex Analysis",
				hasNotes: false
			}
		]
	},
	{
		term: "Summer 2021",
		courses: [
			{
				name: "PHYS1980 - Independent Study in Electromagnetism",
				hasNotes: false
			},
			{
				name: "MATH1530 - Abstract Algebra",
				hasNotes: false
			},
			{
				name: "CSCI1971A - Data Science",
				hasNotes: false
			},
			{
				name: "PHIL0211 - Modern Political Philosophy",
				hasNotes: false
			}
		]
	},
	{
		term: "Spring 2021",
		courses: [
			{
				name: "PHYS0500 - Advanced Classical Mechanics",
				hasNotes: true,
				notes: "phys0500-notes.pdf"
			},
			{
				name: "PHYS0070 - Analytical Mechanics",
				hasNotes: true,
				notes: "phys0070-notes.pdf"
			},
			{
				name: "MATH1120 - Partial Differential Equations",
				hasNotes: true,
				notes: "math1120-notes.pdf"
			},
			{
				name: "PHIL1283 - Philosophy of Quantum Mechanics",
				hasNotes: false
			},
		]
	},
	{
		term: "Fall 2020",
		courses: [
			{
				name: "CSCI0190 - Accelerated Introduction to Computer Science",
				hasNotes: false
			},
			{
				name: "Linear Algebra",
				hasNotes: true,
				notes: "linear-algebra-notes.pdf"
			}
		]
	},
	{
		term: "Summer 2020",
		courses: [
			{
				name: "Multivariable Calculus",
				hasNotes: true,
				notes: "multivariable-calculus-notes.pdf"
			}
		]
	}
]