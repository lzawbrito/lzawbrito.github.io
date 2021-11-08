import React from "react";
import { Link } from "react-router-dom";

export default class EPK extends React.Component {
	render() {
		return <>
    <img src="images/concrete-barriers.JPG" alt="Me" width="40%" class="centerImage"></img>
    <h3>Bio</h3>
    <p>
        Lucas Brito is songwriter, producer, and multi-instrumentalist originally from Fortaleza, Brazil. Brito’s
        musical work spans the genres of rock, folk, electronic music, and more generally experimental music. He draws
        influence from the likes of Chico Buarque, Animal Collective, and Slint. This makes for an eclectic, unique
        sound that continues to develop with his new releases. All of Brito’s solo work was recorded using a home studio
        setup, at his home in Sammamish, Washington. Brito also works with his band Steve’s Mind, a rock group for which
        he primarily plays drums and cowrites.
    </p>
    <p>
        Brito is currently studying physics and computer science at Brown University. He continues to
        work on his solo music, as well as continuing to collaborate with Steve’s Mind. Brito also creates works of
        literature such as essays, novels, as well as guides on concepts in math, physics, and computer science. Brito
        also competes in the United States Powerlifting Association, which he has done since 2019.
    </p>
    <hr/>
    <h3>Music</h3>
	<p style={{textIndent:'0px'}}>
	My music and scores can be found <Link to="/music">here</Link>
	</p>
    <hr/>
    <h3>Live Sets</h3>
    <iframe style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '40%', aspectRatio: '16 / 9'}} width="40%" src="https://www.youtube.com/embed/wG1FfcyGLwM" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    <hr/>
    <h3>Contact</h3>
    <p style={{textIndent: '0px'}}>Email: <a href="mailto:lzawbritomusic@gmail.com">lzawbritomusic@gmail.com</a><br/>
        Phone: (206)816-4186
    </p>
    <hr/>
    <img src="images/fortress.JPG" alt="Me in a fortress" width="40%" class="centerImage"
        style={{paddingTop:'0px'}}></img>
		</>
	}
}