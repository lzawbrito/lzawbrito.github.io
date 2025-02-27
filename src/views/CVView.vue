<script>
	import PublicationsList from '../components/PublicationsList.vue';

  export default {
    components: { PublicationsList },
		data() {
			return {
				education: [
					{ year: '2014-2020', text: 'The Overlake School, Redmond, WA' },
					{ year: '2020-2024.5',  text: 'Brown University, Providence, RI. B.Sc. in Mathematical Physics and Computer Science' } 
				],
				employment: [
					{ year: '2017-2018', text: 'Assistant instructor, Play-Well Teknologies'},
					{ year: '2022-2023', text: 'Teaching assistant, APMA1930W: Probabilities in Quantum Mechanics'},
					{ year: '2023', text: 'Instructional Lab Assistant, Brown Physics Dept.'},
				],
				awards: [
					{ year: '2023-2024', text: '<a href="https://goldwaterscholarship.gov/" target="_blank">Goldwater Scholar</a> in Physics and Astronomy' },
				],
				outreach: [
					{ year: '2021-2022', text: 'Undergraduate Physics Journal Club, Co-head' },
					{ year: '2022-pres.', text: "Undergraduate Physics Journal Club, Head" },
				],
				skills: [
					{ category: 'Programming languages', text: 'Python (Scipy, Numpy, Matplotlib/Seaborn, SKLearn, Pandas), Julia, Java, Javascript (React, Vue), HTML, CSS, SQL, LaTeX, bash scripting (Slurm, Git).' },
					{ category: 'Languages', text: 'English, Portuguese (fluent), Spanish (conversational).' }
				],
				coursework: [
					{ 
						subject: "Physics",
						courses: [
							"PHYS0500 - Advanced Classical Mechanics",
							"PHYS0070 - Analytical Mechanics",
							"PHYS1980 - Independent Study in Electromagnetism",
							"PHYS1510 - Advanced Electromagnetic Theory",
							"PHYS2050 - Quantum Mechanics I (+)",
							"PHYS519  - Quantum Mechanics III [at the University of Washington] (+)",
							"PHYS2070 - Advanced Quantum Mechanics (+)",
							"PHYS2470 - Advanced Statistical Mechanics (+)",
							"PHYS2300 - Quantum Theory of Fields I (+)",
							"PHYS2600 - Computational Physics (+)",
							"PHYS2320 - Quantum Theory of Fields II (+)",
							"PHYS2430 - Quantum Many Body Theory (+)",
							"PHYS1980 - DISP in Generalized Symmetries and 't Hooft Anomalies"
						]
					},
					{
						subject: "Computer Science",
						courses: [
							"CSCI0190 - Accelerated Introduction to Computer Science",
							"CSCI1951 - Data Science",
							"CSCI0320 - Introduction to Software Engineering",
							"CSCI2370 - Interdisciplinary Scientific Visualization (+)",
							"CSCI1970 - Individual Independent Study in Diffusion MRI",
						]
					},
					{
						subject: "Mathematics",
						courses: [
							"MATH1120 - Partial Differential Equations",
							"MATH1260 - Complex Analysis",
							"MATH1530 - Abstract Algebra",
							"MATH2010 - Differential Geometry (+)"
						]
					},
					{
						subject: "Other",
						courses: [
							"PHIL1283 - Philosophy of Quantum Mechanics",
							"PHIL0211 - Modern Political Philosophy",
							"PHIL1860 - Sense and Reference",
							"PHIL2710 - Recent Debates in the Philosophy of Logic (+, *)"
						]
					}
				]
			}
		}
  }

</script>
<template>
<main>
	<h1>
		Lucas Z. Brito
	</h1>
	<p id="contact-info">CV/Resume <span :style="{ fontFamily: 'Courier New' }" >
			[<a href="/docs/resume/lucas-z-brito-resume.pdf">pdf</a>, 
			<a href="/docs/resume/lucas-z-brito-resume.tex">tex</a>]
		</span>
		// <a :style="{ fontFamily: 'Courier New' }" 
		href="mailto:lucas_brito@brown.edu">lucas_brito@brown.edu</a></p>
	<p class="fine-print">This page is not accessible from the main website for privacy.</p>
	<h2 class="line-header">
		Education
	</h2>
	<table>
		<tr v-for="i in education" :key="i.year">
			<td class="table-date">{{ i.year }}</td>
			<td>{{ i.text }}</td>
		</tr>
	</table>
	<h2 class="line-header">
		Publications
	</h2>
	<PublicationsList n="5"/>
	<!-- <h2 class="line-header">
		Other Research
	</h2> -->
	<!-- <table>
		<tr v-for="i in otherResearch" :key="i.year">
			<td class="table-date">{{ i.year }}</td>
			<td>{{ i.text }}</td>
		</tr>
	</table> -->
	<h2 class="line-header">
		Employment
	</h2>
	<table>
		<tr v-for="i in employment" :key="i.year">
			<td class="table-date">{{ i.year }}</td>
			<td>{{ i.text }}</td>
		</tr>
	</table>
	<h2 class="line-header">Awards and Recognition</h2>
	<table>
		<tr v-for="i in awards" :key="i.year">
			<td class="table-date">{{ i.year }}</td>
			<td v-html="i.text"></td>
		</tr>
	</table>
	<h2 class="line-header">Outreach</h2>
	<table>
		<tr v-for="i in outreach" :key="i.year">
			<td class="table-date">{{ i.year }}</td>
			<td>{{ i.text }}</td>
		</tr>
	</table>
	<h2 class="line-header">Skills</h2>
	<table>
		<tr v-for="i in skills" :key="i.category">
			<td class="table-date">{{ i.category }}</td>
			<td>{{ i.text }}</td>
		</tr>
	</table>
	<h2 class="line-header">
		Coursework
	</h2>
	<p><span id="courses">(+)</span> = Graduate-level, <span id="courses">(*)</span> = Not taken for credit.</p>
	<div v-for="s in coursework" :key="s.subject">
	<h3>{{s.subject}}</h3>
	<ul>
		<li class="no-bottom-padding" id="courses" v-for="c in s.courses" :key="c">{{c}}</li>
	</ul>
	</div>
	
</main>
</template>

<style scoped>
table {
	border: none;
	table-layout: fixed;
}

.table-date {
	font-family: var(--mono-font), monospace;
	text-align: right;
	vertical-align: top;
	padding-right: 10px;
	width: 12ch;
}

td {
	vertical-align: top;
}

ul {
	padding-bottom: 0px;
}

ul.no-bullets {
	list-style-type: none;
}

#courses {
  font-family: var(--mono-font), monospace;
  font-style: italic;
	white-space: pre-wrap;
}

h2 {
	padding-top: 10px;
}

#contact-info {
	padding-bottom: 0px;
}

@media (max-width: 1024px) {
	#contact-info {
		text-align: center;
	}
}

</style>