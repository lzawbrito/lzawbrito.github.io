import React from "react";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; 
import gfm from 'remark-gfm';

const content = `
Astrophysics and computer science student at Brown University. Songwriter and occasional writer. Interested in 
math, philosophy, and powerlifting.

I was born in San Francisco, grew up in Brazil, and am currently living in the suburbs of Seattle. 
Don't hesitate to reach out if 
you have any inquiries---if you're on desktop, my socials can be found below, and 
if you're on mobile, they're under the § along with the navigation menu. 

In addition to my solo music, I am a member of a Seattle art-rock outfit named 
[Steve's Mind](https://www.stevesmindband.com), an as-of-yet unnamed noise/hardcore 
five-piece, and I have scored several short films. 
`

export default class HomeComponent extends React.Component {
	render() {
		return <>
		<img src="/images/me-round.png" alt="Me" className="centerImage"></img>
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