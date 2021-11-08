import { read } from 'fs';
import locke from './articles/locke-property-rights.md';
import chicoReview from './articles/chico-review.md'
import visionsOfGuajiru from './articles/visions-of-guajiru.md'
import danceAsWeapons from './articles/dance-as-weapons.md'
import test from './articles/test.md'
import randomWalkerHeatEquation from './articles/random-walker-heat-equation.md'

export var articles = [
	// {
	// 	id: "discrete-continuous-phenomena",
	// 	title: "On Discrete and Continuous Phenomena"
	// 	summary: "A brief derivation of an unexpected occurrence of the heat equation, and some discussion.",
	// 	date: "October 17, 2021",
	// 	contentPath: randomWalkerHeatEquation,
	// 	content: null
	// },
	{
		id: "dance-as-weapons",
		title: "Dance as Weapons: Civil Simulacra and the Human Material",
		summary: `
		Karl Marx's unfortunately titled _On the Jewish Question_ is known for 
		its formulation of liberty: true, _human_ liberty is a physical one, 
		and it is not a liberty defined by legislative terms. In this essay I 
		explore the idea further, recasting Marx's living individual/citizen
		dialectic as a real/hyperreal relationship in order to argue for a 
		_physical_ praxis as opposed to an ideological or intellectual one. 
		`,
		date: "August 11, 2021",
		contentPath: danceAsWeapons,
		content: null,
	},
	{
		id: "locke-property-rights",
		title: "Of Every Fruit Thou Mayest Freely Eat",
		summary: `
		The right to obtain and preserve one's own property has long been a pillar 
		of popular ethics, and to many constitutes the most dominant impetus 
		for a civil state. The notion found its popularity through John 
		Locke's famous _Second Treatise of Government_, which 
		additionally outlines his theory on the natural (i.e., 
		pre-civilization) state of humanity. In this paper I argue that 
		the right to property as outlined by Locke (and thus as commonly 
		interpreted) is fundamentally at odds with this so-called state of 
		nature, and thus property rights are in fact much more limited 
		and moderate than generally accepted. 
		`,
		date: "July 2, 2021",
		contentPath: locke,
		content: null,
	},
	{
		id: "chico-review",
		title: "Chico Buarque's Construção: A Historical Review",
		summary: `
			It is often said that music has the power to heal emotional distress; in times of civil or personal unrest, we call not to any rational or scientific disciplines, but to those that capture the nuance and potency of an
			emotion: art, music, poetry. With this in mind, it’s easy to see why Brazil saw the prolific artistic output it
			did in the sixties and seventies: the nation had just undergone a dramatic shift in power from a left-wing
			administration to a U.S.-backed military dictatorship, rampant censorship limited individual expression, and
			dissidents were silenced—even tortured.
		`,
		contentPath: chicoReview,
		content: null,
		date: `
			November 21, 2020
		`	
	},
	{
		id: "visions-of-guajiru",
		title: "Visions of Guajiru",
		summary: `
			Artur’s mother grew up in the attic of a little blue house in the town of
			Maravilha, Santa Catarina. Every morning, she’d put on disc two, side A, track
			one from Milton Nascimento’s Clube da Esquina—the song “Paisagem da Janela”—and
			skip around her room while changing out of her pajamas; when Lô Borges sang of
			seeing a white mural from his bedroom, she would lean out her window and look at
			her own white mural behind her house, basking in the simple happiness of this
			coincidence. 
		`,
		date: " ",
		contentPath: visionsOfGuajiru,
		content: null
	}
]


var cont = "";

async function fetchText(art) { 
	await fetch(art.contentPath).then((response) => response.text()).then(text => art.content = text).then(() => console.log("contlog: " + cont))
	console.log("cont: " + cont)
}


export async function getData() {
	for (let i in articles) {
		await fetchText(articles[i])
	} 
	return true;
}

