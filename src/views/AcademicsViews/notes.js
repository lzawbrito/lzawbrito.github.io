const notes = [
					{
						category: "\"Journal\" notes",
						description: "Very informal notes on misc. physics, math, CS kept as journal-style entries. Subject to corrections, updates, etc.", 
						docs: [
							{
								name: "2023",
								files: [ 
									{ file: "/docs/notes/logs/2023/log-2023.tex", extension: "tex" }, 
									{ file: "/docs/notes/logs/2023/log-2023.pdf", extension: "pdf" }, 
								]
							},
							{
								name: "2024",
								files: [ 
									{ file: "/docs/notes/logs/2024/log-2024.tex", extension: "tex" }, 
									{ file: "/docs/notes/logs/2024/log-2024.pdf", extension: "pdf" }, 
								]
							}
						]
					},
					{
						category: "LaTeX",
						docs: [
							{
								name: "My template",
								files: [
									{ file: "/docs/notes/latex-templates/lzawbrito-template.sty", extension: "sty"}
								],
							},
							{
								name: "Colors for template",
								files: [
									{ file: "/docs/notes/latex-templates/color-palette.tex", extension: "tex"}
								]
							},
						]
					},
					{
						category: "Other",
						docs: [
							{								
									name: "Intro to Density Matrices and Decoherence",
									files: [
									{ file: "/docs/notes/dm-decoherence.pdf", extension: "pdf" }
									],
							},
							{								
									name: "Intro to Spin Chain Models",
									files: [
									{ file: "/docs/notes/spin-chains.pdf", extension: "pdf" }
									],
							},
						]
					},
		]

export default notes