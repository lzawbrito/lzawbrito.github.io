import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import LocationComponent from "../LocationComponent";
import LanguageBadges from "./LanguageBadge";
import ReadMore from '../ReadMore'
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
		galaxy cluster mergers.  The tool uses data from the [Galaxy Cluster 
		Merger Catalogue](http://gcmc.hub.yt/) to algorithmically recommend 
		candidate simulation data based on user-uploaded observed data, and 
		provides a suite of comparative visualization methodologies.`,
		gh: "https://github.com/lzawbrito/clummp"
	},
	{
		name: "PULSEE",
		langs: ['Python', 'Kivy', 'Matplotlib'],
		summary: `PULSEE (Program for the Simulation of Spin Ensemble Evolution)
		constitutes a suite of condensed matter experiment simulations in the 
		form of a Python package as well as a Kivy GUI.`,
		gh: `https://github.com/lzawbrito/PULSEE`
	},
	{
		name: "Stationary States of Harmonic Oscillator",
		summary: `A simple web app for visualizing arbitrary linear combinations 
		of stationary states of the quantum harmonic oscillator.`,
		langs: ['Javascript', 'Plotly'],
		link: `stationary-states-of-qho`
	}
]

export default function Projects() {
	function makeProject(proj) {
		if (proj.gh) {
			return <>
			<h2>{proj.name}</h2>
			<LanguageBadges langs={proj.langs}></LanguageBadges>
			<ReactMarkdown className='noIndent'>
			{proj.summary}
			</ReactMarkdown>
			<div className="ReadMore"><a href={proj.gh}><img style={{height:'40px'}}src='images/logos/Octicons-mark-github.svg'></img></a></div>
			<hr/>
			</>
		} else {
			return <>
			<h2>{proj.name}</h2>
			<LanguageBadges langs={proj.langs}></LanguageBadges>
			<ReactMarkdown className='noIndent'>
			{proj.summary}
			</ReactMarkdown>
			<ReadMore to={'/projects/' + proj.link}></ReadMore>
			<hr/> 
			</>
		}
	}

	return <>
	<LocationComponent hasSlash={true}/>
	{projects.map(makeProject)}
	</>
}

