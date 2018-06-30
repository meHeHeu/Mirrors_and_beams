(function(i, undefined) {


// PRIVATE

var start_drag_coords;

function getCoords(game, clicked_element) {

	for(var i=0; i<game.n; ++i)
		for(var j=0; j<game.m; ++j)
			if(game.svg_fields[i][j] === clicked_element) {
				return {x: i, y: j, t: TEn.board};
			}

	for(var i=0; i<game.clip_size; ++i)
		if(game.svg_clip_fields[i] === clicked_element)
			return {x: i, t: TEn.clipb};
}


// PUBLIC

i.svgonmousedown = function(evt) {
	start_drag_coords = getCoords(game, evt.target);
	console.log("mdown", start_drag_coords);
}

i.svgonmouseup = function(evt) {
	var end_drag_coords = getCoords(game, evt.target);
	console.log("mup", end_drag_coords);
	move(game, start_drag_coords, end_drag_coords);
	updateBoard(game);
}

i.setUpField = function(field) {
	setAttribs(
		field,
		["onmousedown", "input.svgonmousedown(evt)"],
		["onmouseup", "input.svgonmouseup(evt)"]
	);
}

}(window.input = window.input || {}));

