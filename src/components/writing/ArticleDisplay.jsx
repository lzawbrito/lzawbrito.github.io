import React from "react";
import LocationComponent from "../LocationComponent";
import { articles, getData } from "./Articles";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; 
import gfm from 'remark-gfm';

export default class ArticleDisplay extends React.Component {
	state = {externalData: null}
	article = null;

	componentWillMount() {
		for (let i in articles) {
			if (articles[i].id === this.props.id) {
				this.article = articles[i];
			}
		}
	}
	async componentDidMount() {
		const response = await getData();
		this.setState({externalData: response})
	}
	render() {
		const date = this.article.date;
		const content = this.article.content
		const title = this.article.title
		if (this.state.externalData === null) {
			return <>
			<LocationComponent/>
			<h2>{title}</h2>
			<p>Loading article...</p>
			</>
		} else {
			return <>
			<LocationComponent/>
			<h2>{title}</h2>
			<body>
				<ReactMarkdown
				remarkPlugins={[remarkMath, gfm]}
				rehypePlugins={[rehypeKatex]}
				linkTarget={"_target"}>
					{content}
				</ReactMarkdown>
				<div class="quote" style={{textAlign:"right"}}>{date}</div>
				<a href={this.article.contentPath}><div class="quote" style={{textAlign:"right"}}>Download .md</div></a>
			</body>
			</>
		}
	}
}