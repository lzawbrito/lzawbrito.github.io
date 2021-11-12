import LocationComponent from "../LocationComponent";
import React from "react";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; 
import gfm from 'remark-gfm';

const content = `
## Education
- **2014 - 2020**: The Overlake School, Redmond, WA
- **2020 - present**: Brown University, Providence, RI, B.Sc. in Physics and
  Computer Science
## Research
- **2021-02 - present** _(under Prof. Ian Dell'Antonio)_: Strong gravitational lens classifier in 
  in long-exposure [DECaLS](https://www.legacysurvey.org/decamls/) 
  survey using a residual neural network. The code for the project can be found
  [here](https://github.com/lzawbrito/red-galaxies).
- **2021-08 - present** _(under Dr. Hamid Karani)_: Differential simulation of active Brownian particles 
  in arbitrary confinements. Code for the project can be found 
  [here](https://github.com/lzawbrito/active-matter).
  
## Employment 
- **2017 - 2018**: Assistant instructor, Play-Well Teknologies

## [Coursework](https://www.lucasbrito.site/#/academics/coursework)
- **Physics** Analytical Mechanics, Advanced Classical Mechanics, 
  Electricity and Magnetism, Advanced Electromagnetic Theory, Quantum 
	Mechanics (graduate).
- **Computer Science:** Accelerated Introduction to Computer Science, 
  Data Science, Introduction to Software Engineering, Interdisciplinary 
  Scientific Visualization (graduate).
- **Mathematics:** Single-variable Calculus, Multivariable Calculus, 
  Linear Algebra, Ordinary Differential Equations, Partial Differential 
  Equations, Abstract Algebra, selected topics in discrete mathematics.
- **Misc.:** Philosophy of Quantum Mechanics, Modern Political
  Philosophy.

## Outreach 
- [Undergraduate Physics Journal Club](/physics-ug-journal-club/) (co-head)
`

const col = `
## Languages 
- English 
- Portuguese 
- Spanish (conversational)

## Programming Languages
- Python (Scipy, Numpy, Matplotlib/Seaborn, SKLearn, Pandas, Django, PySpark)
- Java
- Javascript, HTML, CSS, React
- SQL
- $$\\LaTeX$$
- bash scripting

## Software 
MATLAB, Mathematica, Excel, Ableton Live, Adobe Suite, Blender.

`

export default class Research extends React.Component {
	render(){
		return <>
		<LocationComponent/>
		<div class="resumeContainer">
			<div class="resumeBody">
			<ReactMarkdown
			remarkPlugins={[remarkMath, gfm]}
			rehypePlugins={[rehypeKatex]}
			linkTarget={""}>
				{content}
			</ReactMarkdown>
			</div>
			<div class="resumeColumn">
			<ReactMarkdown
			remarkPlugins={[remarkMath, gfm]}
			rehypePlugins={[rehypeKatex]}
			linkTarget={""}>
				{col}
			</ReactMarkdown>
			</div>
		</div>
		</>
	}
}