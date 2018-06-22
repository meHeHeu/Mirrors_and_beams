function id$(id) {
	return document.getElementById(id);
}

function $(selector) {
	return document.querySelector(selector);
}

function $$(selector) {
	return document.querySelectorAll(selector);
}

function createSVG(element, root, width, height) {
	var svg_el = document.createElementNS("http://www.w3.org/2000/svg", element);

	if(root !== undefined)   root.appendChild(svg_el);
	if(width !== undefined)  svg_el.setAttribute("width", width);
	if(height !== undefined) svg_el.setAttribute("height", height);

	return svg_el;
}

function setAttribs(element) {
	for(var i=1; i<arguments.length; ++i)
		element.setAttribute(arguments[i][0], arguments[i][1]);
}

/* https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript */
/* not tested */
function arraysEqual(arr1, arr2) {
	if(a === b) return true;
	if(a == null || b == null) return false;
	if(a.length != b.length) return false;

	for(var i=0; i<a.length; ++i)
		if(a[i] !== b[i])
			return false;

	return true;
}

