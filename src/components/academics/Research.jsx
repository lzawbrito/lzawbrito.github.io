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
- **2021-02 - present**: Strong gravitational lens classisifier in 
  in long-exposure [DECaLS](https://www.legacysurvey.org/decamls/) 
  survey using a residual neural network. The code for the project can be found
  [here](https://github.com/lzawbrito/red-galaxies).
- **2021-08 - present**: Differential simulation of active Brownian particles 
  in arbitrary confinements. Code for the project can be found 
  [here](https://github.com/lzawbrito/active-matter).
  ## Employment 
- **2017 - 2018**: Assistant instructor, Play-Well Teknologies
## Skills
- **Languages**: Python (Scipy, Numpy, Matplotlib/Seaborn, SKLearn, Pandas),
  Java, Javascript/HTML/CSS, React, SQL, $$\\LaTeX$$, bash scripting
- **Software**: MATLAB, Mathematica, Excel, Ableton Live, Adobe Suite, Blender 
 `

export default class Research extends React.Component {
	render(){
		return <>
		<LocationComponent/>
		<body>
			<ReactMarkdown
			remarkPlugins={[remarkMath, gfm]}
			rehypePlugins={[rehypeKatex]}
			linkTarget={"_target"}>
				{content}
			</ReactMarkdown>
		</body>

		</>
	}
}