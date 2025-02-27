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
				otherResearch: [
					{ year: '2021', text: "Residual neural network strong gravitational lens classifier in long-exposure DECaLS survey. Under Ian Dell'Antonio." },
					{ year: '2021', text: "Pedagogical simulation and modelling of active Brownian particles in circular confinements.  Under Hamid Karani." }
				],
				employment: [
					{ year: '2017-2018', text: 'Assistant instructor, Play-Well Teknologies'},
					{ year: '2021', text: 'Teaching assistant, APMA1930W: Probabilities in Quantum Mechanics'}
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
							"PHYS2010 - Techniques in Experimental Physics (+)"
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
							"MATH2010 - Differential Geometry (+,*)"
						]
					},
					{
						subject: "Other",
						courses: [
							"PHIL1283 - Philosophy of Quantum Mechanics",
							"PHIL0211 - Modern Political Philosophy",
							"PHIL1860 - Sense and Reference",
							"PHIL2710 - Recent Debates in the Philosophy of Logic (+)"
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
	<p id="contact-info">CV/Resume <span :style="{ fontFamily: 'Computer Modern Typewriter' }" >[<a href="/docs/lucas-z-brito-resume.pdf">pdf</a>]</span>
		// <a :style="{ fontFamily: 'Computer Modern Typewriter' }" 
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
	<h2 class="line-header">
		Other Research
	</h2>
	<table>
		<tr v-for="i in otherResearch" :key="i.year">
			<td class="table-date">{{ i.year }}</td>
			<td>{{ i.text }}</td>
		</tr>
	</table>
	<h2 class="line-header">
		Employment
	</h2>
	<table>
		<tr v-for="i in employment" :key="i.year">
			<td class="table-date">{{ i.year }}</td>
			<td>{{ i.text }}</td>
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
	font-family: 'Computer Modern Typewriter', monospace;
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
  font-family: "Computer Modern Typewriter", monospace;
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