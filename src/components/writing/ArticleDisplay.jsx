import React from "react";
import LocationComponent from "../LocationComponent";
import { articles } from "./Articles";
import ReactHtmlParser from 'react-html-parser';


export default function articleDisplay(props) {
		var article = {id: "", title: "Something has gone wrong.", content: [], date: ""};
		for (let i in articles) {
			if (articles[i].id === props.id) {
				article = articles[i]	
			}
		}
		const title = article.title;

		const content = '<p>' + article.content.replaceAll('\n\n', '</p><p>') + '</p>'
		const date = article.date;
		return <>
		<LocationComponent/>
		<h2>{title}</h2>
		<body>
			{ReactHtmlParser(content)}
			<div class="quote" style={{textAlign:"right"}}>{date}</div>
		</body>
		</>
}