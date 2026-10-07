<script setup>
import PubItem from '../components/PubItem.vue';
import TalkItem from '../components/TalkItem.vue';

const profiles = [
	{ name: 'INSPIRE', url: 'https://inspirehep.net/authors/3203677' },
	{ name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=vvraEfcAAAAJ' },
	{ name: 'arXiv', url: 'https://arxiv.org/search/?searchtype=author&query=Brito%2C+Lucas+Z' },
]
</script>

<template>
	<div>
		<div class="profile-links link-boxes">
			<a v-for="p in profiles" :key="p.name" :href="p.url" target="_blank">{{ p.name }}</a>
		</div>
		<h1 id="positions" class="line-header" style="padding-bottom: 10px;">
			Positions
		</h1>
		<div class="bio-grid">
			<div class="bio-entry">
				<div class="bio-logo">
					<img src="/assets/logos/harvard.svg" alt="Harvard University" />
				</div>
				<div class="bio-arrow"></div>
				<span class="bio-inst">Harvard University&ensp;</span>
				<span class="bio-title">PhD in Physics (adv: Ashvin Vishwanath)</span>
			</div>
			<div class="bio-year">2024</div>
			<div class="bio-entry">
				<div class="bio-logo">
					<img src="/assets/logos/brown.png" alt="Brown University" />
				</div>
				<div class="bio-arrow"></div>
				<span class="bio-inst">Brown University&ensp;</span>
				<span class="bio-title">B.Sc. in Mathematical Physics</span>
			</div>
			<div class="bio-year">2020</div>
		</div>
		<h1 id="publications" class="line-header">Publications</h1>
		<h3 id="year"> 2026 </h3>
		<PubItem title="Lattice 2-group symmetries: operators, defects, and gauging"
			v-bind:authors="['Lucas Z. Brito', 'Salvatore D. Pace']" arxiv="2609.10682"
			arxivurl="https://arxiv.org/abs/2609.10682" />
		<PubItem title="General Microstructure Factor Analysis of Diffusion MRI in Gray-Matter Predicts Cognitive Scores"
			v-bind:authors="['Lucas Z. Brito', 'Ryan P. Cabeen', 'David H. Laidlaw']"
			journal="NeuroImage" doi="NeuroImage.2026.121991"
			doiurl="https://doi.org/10.1016/j.neuroimage.2026.121991" arxiv="2510.24879"
			arxivurl="https://arxiv.org/abs/2510.24879" />
		<h3 id="year"> 2025 </h3>
		<PubItem title="Reconstructing Spin Hamiltonians of 2D Gutzwiller-Projected Wavefunctions "
			v-bind:authors="['Lucas Z. Brito', 'J. B. Marston']" arxiv="2510.15034"
			arxivurl="https://arxiv.org/abs/2510.15034" />
		<h3 id="year"> 2024 </h3>
		<PubItem title="Hamiltonian reconstruction: The correlation matrix and incomplete operator bases"
			v-bind:authors="['Lucas Z. Brito', 'Stephen Carr', 'J. Alexander Jacoby', 'J. B. Marston']"
			journal="Physical Review B" doi="PhysRevB.110.125118"
			doiurl="https://journals.aps.org/prb/abstract/10.1103/PhysRevB.110.125118" arxiv="2311.09302"
			arxivurl="https://arxiv.org/abs/2311.09302" />
		<h3 id="year"> 2023 </h3>
		<PubItem
			title="PULSEE: A software for the quantum simulation of an extensive set of magnetic resonance observables"
			v-bind:authors="['Davide Candoli', 'Ilija K. Nikolov', 'Lucas Z. Brito', 'Stephen Carr', 'Samuele Sanna', 'Vesna F. Mitrović']"
			journal="Computer Physics Communications" doi="j.cpc.2022.108598"
			doiurl="https://www.sciencedirect.com/science/article/pii/S0010465522003174" arxiv="2108.11415"
			arxivurl="https://arxiv.org/abs/2108.11415" />
		<h1 id="talks" class="line-header">Talks</h1>
		<h3 id="year"> 2026 </h3>
		<TalkItem title="Lattice 2-group symmetries" location="Vishwanath group meeting" date="Sep 2026"
			v-bind:links="[{ label: 'slides', url: '/docs/talks/2group-pres.pdf' }]" />
		<h1 id="documents" class="line-header">Documents</h1>
		<ul>
			<li><span class="doc-name">CV</span>
				<span class="notes-link">
					<a href="/docs/resume/lucas-z-brito-resume.tex">tex</a>,
					<a href="/docs/resume/lucas-z-brito-resume.pdf">pdf</a>
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
	</div>
</template>


<style scoped>
h1 {
	padding-top: 10px;
}

.profile-links {
	padding-top: 4px;
}

.bio-grid {
	display: flex;
	flex-direction: column;
	gap: 4px;
	/* border: 1px solid var(--color-text-mute); */
	/* padding: 12px; */
	width: 100%;
}

.bio-entry {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 12px;
}

.bio-logo {
	width: 28px;
	height: 28px;
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}

.bio-logo img {
	width: 100%;
	height: 100%;
	object-fit: contain;
	filter: grayscale(1);
}

/* Dark mode disabled
@media (prefers-color-scheme: dark) {
	.bio-logo img {
		filter: grayscale(1) invert(1);
	}
}
*/

.bio-arrow {
	width: 1px;
	height: 28px;
	background: var(--color-text-mute);
	flex-shrink: 0;
}

.bio-year {
	font-family: var(--mono-font), monospace;
	font-size: 0.8em;
	width: fit-content;
	position: relative;
	left: calc(28px + 12px);
	transform: translateX(-50%);
}

.bio-inst {
	font-weight: 500;
}

.bio-title {
	font-family: var(--serif-font), Garamond, serif;
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
	margin-top: 14px;
	margin-bottom: 6px;
}
</style>