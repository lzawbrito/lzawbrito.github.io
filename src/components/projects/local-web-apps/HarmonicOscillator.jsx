import createPlotlyComponent from 'react-plotly.js/factory';
import { useEffect } from 'react';
import Plotly, { plot } from 'plotly.js'
import { useState } from 'react';
import { factorial } from 'mathjs'
import LocationComponent from '../../LocationComponent';
import TextBox from '../../TextBox';
import { MathComponent } from 'mathjax-react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; 
import gfm from 'remark-gfm';
const Plot = createPlotlyComponent(Plotly);

const background = `
### Background 
The harmonic oscillator is among the most famous quantum mechanical problems,
being one of the few situations which can be solved analytically as well as a 
problem of tremendous significance to quantum field theory. The harmonic 
oscillator can also be a remarkable pedagogical tool—seeing the harmonic
oscillator's time evolution in action helps internalize the significance of 
stationary states and superpositions thereof, probability density functions,
coherent states, and wave mechanics in general.

Harmonic oscillatory motion arises from a force proportional to displacement 
from a certain equilibrium; i.e. 

$$
F = - m\\omega^2 x 
$$

if the equilibrium position is at the origin. With the spatial integral of 
the force yielding the potential energy, we know that the Hamiltonian can be 
written 

$$
H = \\frac{p^2}{2m} + \\frac{m \\omega^2 x^2}{2}
$$

Substituting this in the Schroedinger equation gives us the time evolution 
equation for the wavefunction. Choosing a wavefunction $\\psi_E(x)$ that is an eigenstate
of the Hamiltonian—i.e., a stationary state—and casting the problem in the position basis (where $ p = 
-i \\hbar (\\partial/\\partial x)$) gives us the 
following partial differential equation for $\\psi(x)$:
$$
E \\psi_E(x) = - \\frac{\\hbar^2}{2m}\\frac{d^2 \\psi_E}{dx^2} + \\frac{1}{2}
m \\omega^2 x^2 \\psi_E(x)
$$

Solving this equation is a task too laborious to reproduce here 
(although I encourage the reader to look into this at their own time, for it 
is an illuminating process, especially if tackled using creation and 
annihilation operators), but at the end we  is 
$$
\\langle x | n \\rangle = \\psi_E(x) = \\frac{1}{2^n n!} \\left( 
	\\frac{m\\omega}{\\pi\\hbar} \\right)^{1/4} 
$$
$$	
\\cdot \\exp \\left( -\\frac{m\\omega x^2}{2\\hbar}\\right)
	H_n\\left(\\sqrt{\\frac{m\\omega}{\\hbar}} x\\right)
$$

for $n \\geq 0$ depending on $E$ and with $H_n$ being the $n$-th [Hermite
polynomial](https://en.wikipedia.org/wiki/Hermite_polynomials).

Time evolving these stationary states amounts to multiplying by a phase term,
effectively rotating the stationary state in complex space: 
$$
\\langle x | n,t \\rangle = 
\\langle x | n \\rangle \\exp\\left(-\\frac{iEt}{\\hbar} \\right)
$$

The imaginary and real components of the above function are precisely what you 
see in the above animation. One then sees why stationary states are named so 
despite this time-dependent phase term: the real and imaginary components 
rotate over time, being multiplied by $\\cos(-Et/\\hbar)$ and $\\sin(-Et/\\hbar)$
respectively, but the distance from the $x$-axis to the complex value of the 
wavefunction at that time and position remains the same—i.e., $|\\psi_E|^2$, 
the only relevant observable quantity, does not change with time, as you can 
verify yourself. 

However, if we superpose several different stationary states with different 
energies, we obtain phase terms which evolve at different rates (since we have 
$\\exp(-iEt/\\hbar)$ with $E$ varying with $n$). This superposition then does 
not end up having a $|\\psi|^2$ invariant with time, and one sees the 
probability of finding the particle at some $x$ is not constant. For example, 
the (un-normalized state)
$$
|\\psi\\rangle = | 0 \\rangle + | 1 \\rangle
$$

actually has a peak probability density that oscillates much like a classical
oscillator, as you can observe yourself in the animation. 

### Technical Details 
This web-app was implemented using [Plotly](https://plotly.com/javascript/) and
[stdlib](https://github.com/stdlib-js/stdlib). 
 `

var hermitepoly = require( '@stdlib/math-base-tools-hermitepoly' );
var t = 0
var animating = false 
const plot_bg = '#F5F5F5'

var coefficient = '0'
var n = '0'
const setCoefficient = (newC) => coefficient = newC
const setN = (newN) => n = newN

export default function HarmonicOscillator() {

	const [coefficients, setCoefficients] = useState([1])
	const [latex, setLatex] = useState('1 \\cdot \\vert 0 \\rangle')

	function makeLatex(coeffs) {
		let output = ""
		for (let i in coeffs) {
			if (coeffs[i] == 0) {
				continue
			}

			if (output === "") {
				output = output + coeffs[i].toString() + " \\cdot \\vert " + i.toString() + "\\rangle"
				continue 
			}
			let coeff = coeffs[i].toString()
			output = output +  " + " + coeff + " \\cdot \\vert " + i.toString() + "\\rangle" 
		}

		output = (output === "") ? "0" : output
		return output
	}

	let m = 1 
	let hbar = 1
	let om = 1 
	let pi = Math.PI
	const dt = 0.01

	function reStationaryState(x, t, n) {
		let an = (m * om / (pi * hbar * Math.pow(2, 2 * n) * Math.pow(factorial(n), 2)))
		let f = Math.exp((-1 * m * om * Math.pow(x, 2)) / (2 * hbar))
		let hn = hermitepoly(n, Math.sqrt((m * om) / hbar) * x)
		let reU = Math.cos(((n + 0.5)* t) / hbar)
		return an * f * hn * reU
	}

	function imStationaryState(x, t, n) {
		let an = (m * om / (pi * hbar * Math.pow(2, 2 * n) * Math.pow(factorial(n), 2)))
		let f = Math.exp((-1 * m * om * Math.pow(x, 2)) / (2 * hbar))
		let hn = hermitepoly(n, Math.sqrt((m * om) / hbar) * x)
		let reU = Math.sin(((n + 0.5 )* t) / hbar)
		return an * f * hn * reU
	}

	function superposition(coefficients, x, t, func) {
		var output = 0
		var i = 0
		coefficients.forEach((a) => {
			output += a * func(x, t, i)
			i++ 
		})
		return output 
	}

	function probDensity(coefficients, x, y) {
		return Math.pow(superposition(coefficients, x, t, reStationaryState), 2)
			+ Math.pow(superposition(coefficients, x, t, imStationaryState), 2)
	}


	var x = []
	var rey = []
	var imy = []
	var prob = [] 
	const low = -10
	const high = 10
	const nSteps = 1000
	
	for (let i = 0; i < nSteps; i++) {
		x[i] = ((high - low) / nSteps) * i + low
		rey[i] = superposition(coefficients, x[i], 0, reStationaryState)
		imy[i] = superposition(coefficients, x[i], 0, imStationaryState)
		prob[i] = probDensity(coefficients, x[i], 0)
	}

	// Set ymax to be maximum of real component at t = 0
	var ymax = rey.reduce(function(a, b) {
		return Math.max(a, b)
	}, 0) 
	ymax = 1

	function updateAndDraw() {
		for (let i = 0; i < nSteps; i++) {
			x[i] = ((high - low) / nSteps) * i + low
			rey[i] = superposition(coefficients, x[i], t, reStationaryState)
			imy[i] = superposition(coefficients, x[i], t, imStationaryState)
			prob[i] = probDensity(coefficients, x[i], t)
		}
		t += dt 
		try {
			Plotly.animate('centerPlotly', {
				data: [{ x: x, y: rey }, {x: x, y: imy}, {x: x, y: prob}]
			}, {
				transition: {
					duration: 0
				},
				frame: {
					duration: 0,
					redraw: false
				}
			})
		} catch (error) {
			console.log("Error.")
		}
		if (animating) {
			requestAnimationFrame(updateAndDraw);
		}
	}

	var data = [
		{
			x: x, 
			y: rey,
			name: 'Re',
			line: {
				color: 'black'
			}
		},
		{
			x: x, 
			y: imy,
			name: 'Im',
			line: {
				color: 'lightgrey'
			}
		},
		{
			x: x, 
			y: prob, 
			name: '|ψ|²',
			line: {
				color: '#3802B8'
			}
		}
	]

	var layout = {
		xaxis: {range: [-5, 5]},
		yaxis: {range: [-ymax, ymax]},
		plot_bgcolor: plot_bg,
		paper_bgcolor: plot_bg,
		margin: {b: 0, t: 30}
	}	

	useEffect(() => {
		t = 0
		animating = true
		requestAnimationFrame(updateAndDraw)
		return function cleanup() {
			animating = false 
			console.log("cleanup")
		}
	})

	function addStationaryState() {
		let intN = parseInt(n)
		let floatC = parseFloat(coefficient)
		var coefficientsClone = coefficients
		coefficientsClone[intN] = floatC
		setLatex(makeLatex(coefficientsClone))
		console.log(coefficientsClone)
		setCoefficients(coefficientsClone)
	}

	function clear() {
		var coefficientsClone = coefficients
		for (let i in coefficientsClone) {
			coefficientsClone[i] = 0
		}
		setLatex(makeLatex(coefficientsClone))
		console.log(coefficientsClone)
		setCoefficients(coefficientsClone)
	}

	return <div>
		<LocationComponent/>
		<h2>Quantum Harmonic Oscillator</h2>
		<Plot style={{}} divId='centerPlotly' data={data} layout={layout}></Plot>
		<p style={{textIndent: '0px'}}>
		<b>Currently displaying:</b>
		<MathComponent tex={'\\vert \\psi(t=0) \\rangle = ' + latex}/>
		<div style={{paddingBottom: '3px'}}>
			<TextBox text='Energy level (n)' change={setN}></TextBox>
		</div>
		<div>
			<TextBox text='Coefficient' change={setCoefficient}></TextBox>
		</div>
		<div className="horizontalButtonContainer">
			<button onClick={addStationaryState}>Add/Change State</button>
			<button onClick={clear}>Clear</button>
		</div>
		</p>
		<ReactMarkdown
				remarkPlugins={[remarkMath, gfm]}
				rehypePlugins={[rehypeKatex]}
				linkTarget={"_target"}>
			{background}
		</ReactMarkdown>
	</div>
}