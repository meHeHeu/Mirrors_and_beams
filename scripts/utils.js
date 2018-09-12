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
 * @params arguments - id strings
 * @return - dictionary of elements by id strings given as parameters
 */
 function buildElementList() {
	var elementList = {};
	for(var arg of arguments)
		elementList[arg] = id$(arg);
	return elementList;
 }

/**
 * @param obj - object to search in
 * @param val - value to of searched key
 * @return - key of the value assigned to that key
 */
function getKeyByValue(obj, val) {
	return Object.keys(obj).find(key => obj[key] === val);
}

/**
 * @param numb - number to convert
 * @return - html color
 */
function numbToColor(numb) {
	var str = numb.toString(16);

	while(str.length<6)
		str = "0"+str;

	return "#"+str;
}

/**
 * https://www.sitepoint.com/javascript-generate-lighter-darker-color/
 * @param col - color to apply luminance to
 * @param lum - luminance to apply
 * @return - color after applying luminance
 */
function setLumosity(col, lum) {
	// validate col string (clean the string and expand 3-digit code
	col = String(col).replace(/[^0-9a-f]/gi, '');
	if(col.length < 6)
		col = col[0]+col[0]+col[1]+col[1]+col[2]+col[2];
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#";
	for(var i = 0; i < 3; ++i) {
		var c = parseInt(col.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c * lum), 255)).toString(16);
		rgb += ("00"+c).substr(c.length).toUpperCase();
	}

	return rgb;
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
 * https://stackoverflow.com/questions/683366/remove-all-the-children-dom-elements-in-div
 * @param element - element to clear of children
 */
function removeAllChildren(element) {
	while(element.hasChildNodes())
		element.removeChild(element.lastChild);
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
 * https://stackoverflow.com/questions/38811421/check-if-an-array-is-subset-of-another-array
 * @param arr - subset in question
 * @param of_arr - superset in question
 * @return - true if arr is subset of of_arr, false otherwise
 */
function isSubset(arr, of_arr) {
	return arr.every(val => of_arr.includes(val));
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

/**
 * @param msg - message
 * @param what - exception name
 * @return - object representing an exception
 */
 function MyException(data, msg, what) {
	function toString() {return msg;}
	return {data, msg, what, toString: toString};
 }

