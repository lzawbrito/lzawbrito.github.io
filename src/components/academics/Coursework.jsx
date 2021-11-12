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
			<p style={{textIndent:0}}>
			* Graduate course.
			</p>
			</body>
		</>
	}
}


export const courseworkList = [
	{
		term: "Spring 2021 (intended)",
		courses: [
			{
				name: "PHYS2060 - Quantum Mechanics*",
				hasNotes: false
			},
			{
				name: "PHYS2100 - General Relativity*",
				hasNotes: false
			},
			{
				name: "PHYS0560 - Experiments in Modern Physics",
				hasNotes: false
			},
			{
				name: "CSCI0300 - Fundamentals of Computer Systems",
				hasNotes: false
			},
			{
				name: "PHIL0995 - Recent Developments in the Philosophy of Language",
				hasNotes: false
			}
		]
	},
	{
		term: "Fall 2021",
		courses: [
			{
				name: "PHYS2050 - Quantum Mechanics*",
				hasNotes: false
			},
			{
				name: "PHYS1510 - Advanced Electromagnetic Theory",
				hasNotes: false
			},
			{
				name: "CSCI2370 - Interdisciplinary Scientific Visualization*",
				hasNotes: false
			},
			{
				name: "CSCI0320 - Introduction to Software Engineering",
				hasNotes: false
			}
		]
	},
	{
		term: "Summer 2021",
		courses: [
			{
				name: "PHYS1980 - Independent Study in Electromagnetism",
				hasNotes: true,
				notes: "electromagnetism-notes.pdf"
			},
			{
				name: "MATH1530 - Abstract Algebra",
				hasNotes: false
			},
			{
				name: "CSCI1971A - Data Science",
				hasNotes: true, 
				notes: "csci1951a-notes.pdf"
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