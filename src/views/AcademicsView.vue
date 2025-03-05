<script setup>
import PubItem from '../components/PubItem.vue';
</script>

<template>
	<main>
		<h1 class="line-header">Documents</h1>
		<ul>
			<li><span class="doc-name">CV</span>
				<span class="notes-link">
					<a href="/docs/resume/lucas-z-brito-resume.tex">tex</a>,
					<a href="/docs/resume/lucas-z-brito-resume.pdf">pdf</a>
				</span>
			</li>
		</ul>
		<h2>Logs</h2>
		<ul>
			<li>
				<span class="doc-name">
					2024
				</span>
				<span class="notes-link">
					<a href="/docs/notes/logs/2024/log-2024.tex" target="_blank">tex</a>,
					<a href="/docs/notes/logs/2024/log-2024.pdf" target="_blank">pdf</a>
				</span>
			</li>
			<li>
				<span class="doc-name">
					2023
				</span>
				<span class="notes-link">
					<a href="/docs/notes/logs/2023/log-2023.tex" target="_blank">tex</a>,
					<a href="/docs/notes/logs/2023/log-2023.pdf" target="_blank">pdf</a>
				</span>
			</li>
		</ul>
		<h2>LaTeX</h2>
		<ul>
			<li>
				<span class="doc-name">
					Template
				</span>
				<span class="notes-link">
					<a href="/docs/notes/latex-templates/lzawbrito-template.sty">sty</a>
				</span>
			</li>
			<li>
				<span class="doc-name">
					Template colors
				</span>
				<span class="notes-link">
					<a href="/docs/notes/latex-templates/color-palette.tex">tex</a>
				</span>
			</li>
		</ul>
		<h1 class="line-header">Publications</h1>
		<h3 id="year"> 2024 </h3>
		<PubItem title="Hamiltonian reconstruction: The correlation matrix and incomplete operator bases"
			v-bind:authors="['Lucas Z. Brito', 'Stephen Carr', 'J. Alexander Jacoby', 'J. B. Marston']"
			journal="Physical Review B" doi="PhysRevB.110.125118"
			doiurl="https://journals.aps.org/prb/abstract/10.1103/PhysRevB.110.125118" arxiv="arXiv:2311.09302"
			arxivurl="https://arxiv.org/abs/2311.09302" />
		<h3 id="year"> 2023 </h3>
		<PubItem
			title="PULSEE: A software for the quantum simulation of an extensive set of magnetic resonance observables"
			v-bind:authors="['Davide Candoli', 'Ilija K. Nikolov', 'Lucas Z. Brito', 'Stephen Carr', 'Samuele Sanna', 'Vesna F. Mitrović']"
			journal="Computer Physics Communications" doi="j.cpc.2022.108598"
			doiurl="https://www.sciencedirect.com/science/article/pii/S0010465522003174" arxiv="arXiv:2108.11415"
			arxivurl="https://arxiv.org/abs/2108.11415" />
	</main>
</template>


<style scoped>
h1 {
	padding-top: 10px;
}

.doc-name {
	font-family: var(--mono-font), monospace;
	font-style: italic;
}

.doc-name::after {
	content: " "
}

.notes-link {
	font-family: var(--mono-font), monospace;
}

.notes-link::before,
.notes-link::after {
	content: "[";
	font-family: var(--mono-font), monospace;
	text-decoration: none;
}

.notes-link::after {
	content: "]";
}

li {
	padding-bottom: 0px;
}

#year {
	margin-top: 5px;
}
</style>