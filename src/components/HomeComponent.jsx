import React from "react";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; 
import gfm from 'remark-gfm';


const funFacts = [
	"I am a die-hard Vim user.",
	"I first learned to program to make Minecraft mods.",
	"I take notes on plain paper.",
	"my first piece of music gear was an Arturia Microbrute.", 
	"I learned web development while in quarantine for a false-positive COVID exposure."
]

const content = `
Physics and computer science student at Brown University. Songwriter and occasional writer. Interested in 
math, philosophy, and skateboarding.

I was born in San Francisco, grew up in Brazil, and am currently living in the suburbs of Seattle. 
Don't hesitate to reach out if 
you have any inquiries---if you're on desktop, my socials can be found below, and 
if you're on mobile, they're under the § along with the navigation menu. 

In addition to my solo music, I am a member of a Seattle art-rock outfit named 
[Steve's Mind](https://www.stevesmindband.com), an as-of-yet unnamed noise/hardcore 
five-piece, and I have scored several short films. 

A fun fact about me is 
`

function generateContent() {
	const i = Math.floor(Math.random() * funFacts.length)
	return content + funFacts[i]  
}

export default class HomeComponent extends React.Component {
	render() {
		
		return <>
		<img src="/images/me-round-2.png" alt="Me" className="centerImage" width='500x'></img>
		<body>
			<ReactMarkdown
			remarkPlugins={[remarkMath, gfm]}
			rehypePlugins={[rehypeKatex]}
			linkTarget={"_target"}>
				{generateContent()}
			</ReactMarkdown>
			<p style={{textAlign:"center",textIndent:"0px"}}>
				<a href="https://en.wikipedia.org/wiki/Straight_edge" target="_blank" rel="noreferrer">xxx</a>
			</p>
		</body>
		</>
	}
}