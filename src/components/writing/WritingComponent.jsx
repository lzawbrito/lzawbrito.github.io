import React from "react";
import ReadMore from "../ReadMore";
import { articles } from "./Articles";
import LocationComponent from "../LocationComponent";

export default class WritingComponent extends React.Component {
	render() {
		function getMenu(article) {
			return <>
			<LocationComponent hasSlash={true}/>
			<h2>{article.title}</h2>
			<p>{article.summary}</p>
			<ReadMore to={`/writing/${article.id}`}></ReadMore>
			<hr></hr>
			</>
		}
		const content = articles.map(getMenu)
		return <>
		{content}
		</>
	}
}