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
- **2020 - present**: Brown University, Providence, RI, B.Sc. in Astrophysics and
  Computer Science
## Research
- **2021-02 - present**: Research in ML applications to strong gravitational 
  lensing in long-exposure [DECaLS](https://www.legacysurvey.org/decamls/) 
  survey. The code for the project can be found [here](https://github.com/lzawbrito/red-galaxies).
## Employment 
- **2017 - 2018**: Assistant instructor, Play-Well Teknologies
## Skills
- **Languages**: Python (Scipy, Numpy, Matplotlib/Seaborn, SKLearn, Pandas),
  Java, Javascript/HTML/CSS, React, SQL, $$\\LaTeX$$, bash scripting
- **Software**: MATLAB, Mathematica, Excel, Ableton Live, Adobe Suite, Blender 
 `

const old = `
I am currently researching dark matter cosmology under
[Professor Ian Dell'Antonio](https://vivo.brown.edu/display/idellant).
In particular, we are using [weak gravitational lensing](https://ned.ipac.caltech.edu/level5/Tyson2/Tyson_contents.html)
to study dark matter distributions in galactic clusters. 

The specific project I'm involved in is an extension of a 
[recent publication by Huang, et al.](https://arxiv.org/abs/1906.00970) 
wherein new instances of strongly lensed objects 
were discovered using a trained machine learning model. We are
interested in training the same model to classify instances of strong lensing 
in a longer (by roughly five times) exposure and thus deeper survey, in hopes of 
applying similar techniques to identify weak lensing further in the future. 
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