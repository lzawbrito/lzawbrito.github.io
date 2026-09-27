// Build the node/edge graph for the landing page: the root node links to each
// top-level section, and each section links to its subsections.
export function flattenSections(sections, mainPath) {
	let flattened = [{ name: "lzawbrito", path: "/", noLink: false }]
	let edges = []
	function flattenHelper(ss, parentIdx) {
		for (let i = 0; i < ss.length; i++) {
			let section = ss[i]
			let idx = flattened.length
			edges.push([parentIdx, idx])
			flattened.push({
				name: section.name,
				path: mainPath + '#' + section.hash,
				noLink: false
			})
			if ('children' in section) {
				flattenHelper(section.children, idx)
			}
		}
	}
	flattenHelper(sections, 0)
	return [flattened, edges]
}
