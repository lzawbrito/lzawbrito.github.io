import React from "react";
import NavigationComponent from "../NavigationComponent";
import ReadMore from "../ReadMore";

export default class WritingComponent extends React.Component {
	render() {
		return <>
		<h2>
			Chico Buarque's Construção: A Historical Review
		</h2>
		<p>
        It is often said that music has the power to heal emotional distress; in times of civil or personal unrest, we
        call not to any rational or scientific disciplines, but to those that capture the nuance and potency of an
        emotion: art, music, poetry. With this in mind, it’s easy to see why Brazil saw the prolific artistic output it
        did in the sixties and seventies: the nation had just undergone a dramatic shift in power from a left-wing
        administration to a U.S.-backed military dictatorship, rampant censorship limited individual expression, and
        dissidents were silenced—even tortured.
		</p>
		<ReadMore to="/writing/chico-buarque-construcao"></ReadMore>	
		<hr/>
		<h2>
			Visions of Guajiru
		</h2>
		<p>
        Artur’s mother grew up in the attic of a little blue house in the town of Maravilha, Santa Catarina. Every
        morning, she’d put
        on disc two, side A, track one from Milton Nascimento’s Clube da Esquina—the song “Paisagem da Janela”—and skip
        around her room
        while changing out of her pajamas; when Lô Borges sang of seeing a white mural from his bedroom, she would lean
        out her window
        and look at her own white mural behind her house, basking in the simple happiness of this coincidence.
		</p>
		<ReadMore to="/coursework"></ReadMore>	
		<hr/>
		</>
	}
}