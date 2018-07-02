(function(i, undefined) {


// PRIVATE

var
	g,
	d,
	start_drag_coords;

function getCoords(clicked_element) {

	for(var i=0; i<g.m; ++i)
		for(var j=0; j<g.n; ++j)
			if(d.fields[i][j] === clicked_element)
				return {row: i, col: j, t: TEn.board};

	for(var i=0; i<g.clipsize; ++i)
		if(d.clipfields[i] === clicked_element)
			return {col: i, t: TEn.clipb};
}


// PUBLIC

i.init = function(game, drawing) {
	g = game;
	d = drawing;
}

i.setUpField = function(field) {
	setAttribs(
		field,
		"onmousedown", "input.svgonmousedown(evt)",
		"onmouseup", "input.svgonmouseup(evt)"
	);
}

i.svgonmousedown = function(evt) {
	start_drag_coords = getCoords(evt.target);
	console.log("mdown", start_drag_coords);
}

i.svgonmouseup = function(evt) {
	var end_drag_coords = getCoords(evt.target);
	console.log("mup", end_drag_coords);
	g.move(start_drag_coords, end_drag_coords);
	d.update();
}

}(window.input = window.input || {}));

