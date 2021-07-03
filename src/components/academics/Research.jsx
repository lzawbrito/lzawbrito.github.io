import LocationComponent from "../LocationComponent";
import React from "react";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; 
import gfm from 'remark-gfm';

const content = `
## Research 
I am currently doing research in dark matter cosmology under [Professor Ian Dell'Antonio](https://vivo.brown.edu/display/idellant).
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