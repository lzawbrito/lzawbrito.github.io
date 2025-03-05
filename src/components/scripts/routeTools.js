export function flattenRoutes(routes) {
	let flattened = []
	let edges = []
	function flattenHelper(r, depth, currentPath) {
		for (let i = 0; i < r.length; i++) {
			var route = r[i]
			if (!("name" in route) || route.hide) {
				continue
			}

			// At top level every node is home's child
			if (depth === 0) {
				edges.push([0, flattened.length])
			}

			if ("redirect" in route) {
				let parentIdx = flattened.length
				flattened.push({
					name: route.name, 
					path: currentPath + "/" + route.path, 
					noLink: true
				})
				if ("children" in route) {
					let filteredChildren = route.children.filter((c) => !c.hide || ("name" in c))
					for (let c = 0; c < filteredChildren.length; c++) {
						edges.push([parentIdx, flattened.length + c])
					}
					flattenHelper(filteredChildren, depth + 1, currentPath + route.path + '/')  
				}
				continue
			} 

			if (route.path === '/') {
				flattened.push({
					name: "lzawbrito.github.io", 
					path: "/",
					noLink: false
				})
				continue 
			} 
			flattened.push({
				name: route.name, 
				path: currentPath + route.path, 
				noLink: false
			})

		}
	}
	flattenHelper(routes, 0, "")
	return [flattened, edges]
}

export function isFirstRoute(route, targetRouteName) {
	return route.split("/").includes(targetRouteName.toLowerCase())
}