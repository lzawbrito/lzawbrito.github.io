import React from "react";
import ReadMore from "../ReadMore";
import { articles } from "./Articles";
import LocationComponent from "../LocationComponent";
import ReactMarkdown from 'react-markdown';


export default class WritingComponent extends React.Component {
	render() {
		function getMenu(article) {
			return <>
			<h2
			style={{marginBottom:'5px'}}>
				{article.title}
			</h2>
			<div className="quote">
				{article.date}
			</div>
			<ReactMarkdown>{article.summary.replaceAll('\t', '')}</ReactMarkdown>
			<ReadMore to={`/writing/${article.id}`}></ReadMore>
			<hr></hr>
			</>
		}
		const content = articles.map(getMenu)
		return <>
		<LocationComponent hasSlash={true}/>
		{content}
		</>
	}
}