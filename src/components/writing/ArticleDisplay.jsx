import React from "react";
import LocationComponent from "../LocationComponent";
import { articles } from "./Articles";
import ReactMarkdown from 'react-markdown';

export default function articleDisplay(props) {
		var article = {id: "", title: "Something has gone wrong.", content: [], date: ""};
		for (let i in articles) {
			if (articles[i].id === props.id) {
				article = articles[i]	
			}
		}
		const title = article.title;

		const content = article.content.replaceAll('\t', '')
		const date = article.date;
		return <>
		<LocationComponent/>
		<h2>{title}</h2>
		<body>
			<ReactMarkdown>{content}</ReactMarkdown>
			<div class="quote" style={{textAlign:"right"}}>{date}</div>
		</body>
		</>
}