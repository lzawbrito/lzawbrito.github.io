import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import LocationComponent from "../LocationComponent";
import LanguageBadges from "./LanguageBadge";

const projects = [
	{
		name: "DMI",
		langs: ['Python', 'Tensorflow', 'MapReduce', 'PySpark', 'Bash'],
		summary: `A final project turned research endeavor, DMI (Dark Matter 
		Imaging; our group's name) is codename for a Tensorflow-based residual 
		neural network pipeline for classifying strong gravitational lenses 
		based on [Huang et al.'s work.](https://arxiv.org/abs/2005.04730)`,
		gh: 'https://github.com/lzawbrito/red-galaxies',
	},
	{
		name: "CluMMP",
		langs: ['Python', 'React', 'Plotly', 'Django'],
		summary: `CluMMP (Cluster Merger Matching Program) is a browser-based 
		visualization tool for comparative analysis of simulated and observed 
		galaxy cluster mergerss. Constructed with a React front end and Python 
		backend buttressed by Django, the tool uses data from the [Galaxy Cluster 
		Merger Catalogue](http://gcmc.hub.yt/) to algorithmically recommend 
		candidate simulation data based on user-uploaded observed data, then 
		provides a suite of comparative visualization methodologies to facilitate 
		the matching task.`,
		gh: "https://github.com/lzawbrito/clummp"
	},
	{
		name: "PULSEE",
		langs: ['Python', 'Kivy', 'Matplotlib'],
		summary: `PULSEE (Program for the Simulation of Spin Ensemble Evolution)
		constitutes a suite of condensed matter experiment simulations in the 
		form of a Python package as well as a Kivy-constructed GUI.`,
		gh: ``
	}
]

export default function Projects() {
	function makeProject(proj) {
		return <>
		<h2>{proj.name}</h2>
		<LanguageBadges langs={proj.langs}></LanguageBadges>
		<ReactMarkdown className='noIndent'>
		{proj.summary}
		</ReactMarkdown>
		{/* <p style={{textIndent:'0px'}}>{proj.summary}</p> */}
		<div className="ReadMore"><a href={proj.gh}><img style={{height:'40px'}}src='images/logos/Octicons-mark-github.svg'></img></a></div>
		<hr/>
		</>
	}

	return <>
	<LocationComponent hasSlash={true}/>
	{projects.map(makeProject)}
	</>
}

