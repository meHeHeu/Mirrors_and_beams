/**
 * @param id - element id
 * @return - element of @param id
 */
function id$(id) {
	return document.getElementById(id);
}

/**
 * @param selector - selector
 * @return - the first element of @param selector
 */
function $(selector) {
	return document.querySelector(selector);
}

/**
 * @param selector - selector
 * @return - array containing all the elements of @param selector
 */
function $$(selector) {
	return document.querySelectorAll(selector);
}

/**
 * @param element - element to create
 * @param remaining_arguments - pairs key-attribute to set
 * @return - element with setup values
 */
function createSVG(element, root) {
	element = document.createElementNS("http://www.w3.org/2000/svg", element);
	root.appendChild(element);

	for(var i=2; i<arguments.length; i+=2)
		element.setAttribute(arguments[i], arguments[i+1]);

	return element;
}

/**
 * @param element - element to set up
 * @param remaining_arguments - pairs key-attribute to set
 */
function setAttribs(element) {
	for(var i=1; i<arguments.length; i+=2)
		element.setAttribute(arguments[i], arguments[i+1]);
}

/**
 * https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
 * Not tested.
 * @param arr1 - array to compare
 * @param arr2 - array to compare
 * @return - true if arrays are the same / have the same content. False otherwise or when any array is null.
 */
function arraysEqual(arr1, arr2) {
	if(a === b) return true;
	if(a == null || b == null) return false;
	if(a.length != b.length) return false;

	for(var i=0; i<a.length; ++i)
		if(a[i] !== b[i])
			return false;

	return true;
}

